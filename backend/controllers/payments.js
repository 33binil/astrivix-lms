const crypto = require('crypto');
const mailSender = require('../utils/mailSender');
const { courseEnrollmentEmail } = require('../mail/templates/courseEnrollmentEmail');
require('dotenv').config();

const User = require('../models/user');
const Course = require('../models/course');
const CourseProgress = require("../models/courseProgress");
const { default: mongoose } = require('mongoose');

// PayU Configuration
const payuConfig = {
    key: process.env.PAYU_MERCHANT_KEY,
    salt: process.env.PAYU_MERCHANT_SALT,
    testMode: process.env.PAYU_MODE === 'TEST',
    successUrl: `${process.env.FRONTEND_URL}/payment/success`,
    failureUrl: `${process.env.FRONTEND_URL}/payment/failure`
};

// ================ Initiate PayU Payment ================
exports.capturePayment = async (req, res) => {
    const { coursesId } = req.body;
    const userId = req.user.id;

    if (!coursesId || coursesId.length === 0) {
        return res.status(400).json({ success: false, message: "Please provide Course IDs" });
    }

    try {
        let totalAmount = 0;
        const courses = [];
        const user = await User.findById(userId);

        // Calculate total amount and validate courses
        for (const courseId of coursesId) {
            const course = await Course.findById(courseId);
            if (!course) {
                return res.status(404).json({ success: false, message: `Course not found: ${courseId}` });
            }

            // Check if user is already enrolled
            if (course.studentsEnrolled.includes(userId)) {
                return res.status(400).json({ 
                    success: false, 
                    message: `You are already enrolled in ${course.courseName}` 
                });
            }

            totalAmount += course.price;
            courses.push(course);
        }

        // Generate transaction ID
        const txnid = `TXN${Date.now()}`;
        const productInfo = courses.map(course => course.courseName).join(', ');

        // Generate the exact hash string PayU expects
        // Format: sha512(key|txnid|amount|productinfo|firstname|email|udf1|udf2|udf3|udf4|udf5||||||SALT)
        const hashString = `${payuConfig.key}|${txnid}|${totalAmount}|${productInfo}|${user.firstName}|${user.email}|||||||||||${payuConfig.salt}`;
        
        // Debug logging
        console.log('Hash string (exact):', `"${hashString}"`);
        console.log('Hash string length:', hashString.length);
        console.log('Pipe count:', (hashString.match(/\|/g) || []).length); // Should be 15 total pipes
        
        // Generate the hash
        const hashValue = crypto.createHash('sha512').update(hashString).digest('hex');
        console.log('Generated hash:', hashValue);
        
        // Use the raw hash value for PayU
        const hash = hashValue;

        // Prepare payment data
        const paymentData = {
            key: payuConfig.key,
            txnid,
            amount: totalAmount.toString(),
            productinfo: productInfo,
            firstname: user.firstName,
            email: user.email,
            phone: user.contactNumber || '9999999999',
            surl: payuConfig.successUrl,
            furl: payuConfig.failureUrl,
            // Use the raw hash value for PayU
            hash: hash,
            // For debugging - include the hash string in the response (remove in production)
            _hashString: process.env.NODE_ENV === 'development' ? hashString : undefined,
            service_provider: 'payu_paisa'
        };

        return res.status(200).json({
            success: true,
            message: "Payment initiated successfully",
            paymentData,
            coursesId // Return coursesId for verification
        });

    } catch (error) {
        console.error("PAYMENT_INITIATION_ERROR:", error);
        return res.status(500).json({ 
            success: false, 
            message: "Failed to initiate payment",
            error: error.message 
        });
    }
};

// ================ Verify PayU Payment ================
exports.verifyPayment = async (req, res) => {
    const { txnid, amount, mihpayid, status, hash, productinfo, coursesId } = req.body;
    const userId = req.user.id;

    if (!txnid || !amount || !status || !hash) {
        return res.status(400).json({ success: false, message: "Missing required payment details" });
    }

    try {
        // Verify the payment status
        if (status === 'success') {
            // Verify the hash
            const hashString = `${payuConfig.salt}|${status}|||||||||||${userId}|${txnid}|${amount}|${productinfo}|${payuConfig.key}`;
            const generatedHash = crypto.createHash('sha512').update(hashString).digest('hex');

            if (generatedHash !== hash) {
                console.warn("Hash verification failed for transaction:", txnid);
                return res.status(400).json({ success: false, message: "Invalid payment verification" });
            }

            // Enroll the student in the courses
            await enrollStudents(coursesId, userId, res);

            return res.status(200).json({ 
                success: true, 
                message: "Payment verified and enrollment successful",
                paymentId: mihpayid,
                transactionId: txnid
            });
        } else {
            return res.status(400).json({ 
                success: false, 
                message: "Payment failed or was cancelled" 
            });
        }
    } catch (error) {
        console.error("PAYMENT_VERIFICATION_ERROR:", error);
        return res.status(500).json({ 
            success: false, 
            message: "Error verifying payment",
            error: error.message 
        });
    }
};

// ================ Handle PayU Webhook ================
exports.handleWebhook = async (req, res) => {
    try {
        const { txnid, amount, productinfo, status, hash } = req.body;

        // Verify the hash
        const hashString = `${payuConfig.salt}|${status}|||||||||||${txnid}|${amount}|${productinfo}|${payuConfig.key}`;
        const generatedHash = crypto.createHash('sha512').update(hashString).digest('hex');

        if (generatedHash !== hash) {
            console.warn("Invalid webhook hash for transaction:", txnid);
            return res.status(400).send("Invalid webhook data");
        }

        // Here you can update payment status in your database
        // await Payment.findOneAndUpdate(
        //     { txnid },
        //     { status, paymentId: req.body.mihpayid || null },
        //     { new: true }
        // );

        return res.status(200).send("Webhook processed");
    } catch (error) {
        console.error("WEBHOOK_ERROR:", error);
        return res.status(500).send("Error processing webhook");
    }
};

// ================ Enroll Students (Helper Function) ================
const enrollStudents = async (courses, userId, res) => {
    if (!courses || !userId) {
        throw new Error("Please provide data for Courses and UserId");
    }

    for (const courseId of courses) {
        try {
            // Find the course and enroll the student
            const enrolledCourse = await Course.findOneAndUpdate(
                { _id: courseId },
                { $addToSet: { studentsEnrolled: userId } },
                { new: true }
            );

            if (!enrolledCourse) {
                console.error(`Course not found: ${courseId}`);
                continue;
            }

            // Initialize course progress
            const courseProgress = await CourseProgress.create({
                courseID: courseId,
                userId: userId,
                completedVideos: [],
            });

            // Add course to user's enrolled courses
            await User.findByIdAndUpdate(
                userId,
                {
                    $addToSet: {
                        courses: courseId,
                        courseProgress: courseProgress._id,
                    },
                }
            );

            // Send enrollment email
            const user = await User.findById(userId);
            await mailSender(
                user.email,
                `Successfully Enrolled into ${enrolledCourse.courseName}`,
                courseEnrollmentEmail(enrolledCourse.courseName, user.firstName)
            );

        } catch (error) {
            console.error(`Error enrolling student ${userId} in course ${courseId}:`, error);
            throw error;
        }
    }
};

// ================ Send Payment Success Email ================
exports.sendPaymentSuccessEmail = async (req, res) => {
    const { orderId, paymentId, amount } = req.body;
    const userId = req.user.id;

    if (!orderId || !paymentId || !amount || !userId) {
        return res.status(400).json({ 
            success: false, 
            message: "Missing required fields" 
        });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ 
                success: false, 
                message: "User not found" 
            });
        }

        await mailSender(
            user.email,
            "Payment Received - StudyNotion",
            `Dear ${user.firstName},\n\nThank you for your payment of ₹${amount/100}.\n\nOrder ID: ${orderId}\nPayment ID: ${paymentId}\n\nYou can now access your enrolled courses from your dashboard.\n\nBest regards,\nThe StudyNotion Team`
        );

        return res.status(200).json({ 
            success: true, 
            message: "Payment confirmation email sent successfully" 
        });

    } catch (error) {
        console.error("PAYMENT_EMAIL_ERROR:", error);
        return res.status(500).json({ 
            success: false, 
            message: "Failed to send payment confirmation email",
            error: error.message 
        });
    }
};

//     const signature = req.headers['x-rajorpay-signature'];

//     const shasum = crypto.createHmac('sha256', webhookSecret);
//     shasum.update(JSON.stringify(req.body));
//     const digest = shasum.digest('hex');


//     if (signature === digest) {
//         console.log('Payment is Authorized');

//         const { courseId, userId } = req.body.payload.payment.entity.notes;

//         try {
//             const enrolledCourse = await Course.findByIdAndUpdate({ _id: courseId },
//                 { $push: { studentsEnrolled: userId } },
//                 { new: true });

//             // wrong upper ?

//             if (!enrolledCourse) {
//                 return res.status(500).json({
//                     success: false,
//                     message: 'Course not found'
//                 });
//             }

//             // add course id to user course list
//             const enrolledStudent = await User.findByIdAndUpdate(userId,
//                 { $push: { courses: courseId } },
//                 { new: true });

//             // send enrolled mail

//             // return response
//             res.status(200).json({
//                 success: true,
//                 message: 'Signature Verified and Course Added'
//             })
//         }

//         catch (error) {
//             console.log('Error while verifing rajorpay signature');
//             console.log(error);
//             return res.status(500).json({
//                 success: false,
//                 error: error.messsage,
//                 message: 'Error while verifing rajorpay signature'
//             });
//         }
//     }

//     else {
//         return res.status(400).json({
//             success: false,
//             message: 'Invalid signature'
//         });
//     }
// }
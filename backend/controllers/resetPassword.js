const User = require('../models/user');
const mailSender = require('../utils/mailSender');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const { passwordUpdated, resetPasswordTemplate } = require('../mail/templates/passwordUpdate');

// ================ resetPasswordToken ================
exports.resetPasswordToken = async (req, res) => {
    try {
        // extract email 
        const { email } = req.body;

        // email validation
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Your Email is not registered with us'
            });
        }

        // generate token
        const token = crypto.randomBytes(20).toString("hex");

        // update user by adding token & token expire date
        const updatedUser = await User.findOneAndUpdate(
            { email: email },
            { token: token, resetPasswordTokenExpires: Date.now() + 5 * 60 * 1000 },
            { new: true }); // by marking true, it will return updated user


        // create url
        const url = `${process.env.FRONTEND_URL || 'https://nano-robotics-embed-technologies.vercel.app'}/update-password/${token}`;

        // send email containing url with HTML template
        const name = user.firstName || email.split('@')[0];
        await mailSender(email, 'Password Reset Link | NRET', resetPasswordTemplate(url, name));

        // return succes response
        res.status(200).json({
            success: true,
            message: 'Email sent successfully , Please check your mail box and change password'
        })
    }

    catch (error) {
        console.log('Error while creating token for reset password');
        console.log(error)
        res.status(500).json({
            success: false,
            error: error.message,
            message: 'Error while creating token for reset password'
        })
    }
}



// ================ resetPassword ================
exports.resetPassword = async (req, res) => {
    try {
        // extract data
        const token = req.body?.token;
        const { password, confirmPassword } = req.body;

        console.log('Reset password request received');
        console.log('Token:', token);

        // validation
        if (!token || !password || !confirmPassword) {
            return res.status(401).json({
                success: false,
                message: "All fields are required!"
            });
        }

        // validate both passwords
        if (password !== confirmPassword) {
            return res.status(401).json({
                success: false,
                message: 'Passwords do not match'
            });
        }

        // find user by token from DB
        const userDetails = await User.findOne({ token: token });
        console.log('User found:', userDetails ? `Yes - ${userDetails.email}` : 'No');

        if (!userDetails) {
            return res.status(401).json({
                success: false,
                message: 'Invalid or expired token'
            });
        }

        // check token is expire or not
        if (!(userDetails.resetPasswordTokenExpires > Date.now())) {
            return res.status(401).json({
                success: false,
                message: 'Token has expired, please regenerate a new one'
            });
        }

        // hash new password
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Password hashed successfully');

        // update user with New Password and clear the token
        const updatedUser = await User.findByIdAndUpdate(
            userDetails._id,
            { 
                password: hashedPassword,
                token: null,
                resetPasswordTokenExpires: null
            },
            { new: true }
        );
        console.log('User updated:', updatedUser ? 'Yes' : 'No');

        res.status(200).json({
            success: true,
            message: 'Password reset successfully'
        });
    }

    catch (error) {
        console.log('Error while resetting password:', error);
        res.status(500).json({
            success: false,
            error: error.message,
            message: 'Error while resetting password'
        });
    }
}
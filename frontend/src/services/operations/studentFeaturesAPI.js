import { toast } from "react-hot-toast";
import { studentEndpoints } from "../apis.jsx";
import { apiConnector } from "../apiConnector";
import { setPaymentLoading } from "../../slices/courseSlice";
import { resetCart } from "../../slices/cartSlice";

const { COURSE_PAYMENT_API, COURSE_VERIFY_API, SEND_PAYMENT_SUCCESS_EMAIL_API } = studentEndpoints;

// ================ buyCourse ================ 
export async function buyCourse(token, coursesId, userDetails, navigate, dispatch) {
    const toastId = toast.loading("Loading...");
    dispatch(setPaymentLoading(true));

    try {
        // Get payment data from backend
        const response = await apiConnector("POST", COURSE_PAYMENT_API, {
            coursesId: Array.isArray(coursesId) ? coursesId : [coursesId],
            userDetails: userDetails || {}
        }, {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        });

        if (!response.data.success) {
            throw new Error(response.data.message);
        }

        // Debug: Log the entire response from backend
        console.log('Backend response:', response.data);
        
        // Prepare payment data with all required parameters and fallbacks
        const paymentData = {
            // Explicitly include all required parameters
            key: response.data.paymentData.key || import.meta.env.VITE_APP_PAYU_KEY,
            txnid: response.data.paymentData.txnid || `TXN${Date.now()}`,
            amount: response.data.paymentData.amount,
            productinfo: response.data.paymentData.productinfo || 'Course Purchase',
            firstname: userDetails?.firstName || 'Customer',
            email: userDetails?.email || 'customer@example.com',
            phone: userDetails?.contactNumber?.toString() || '9999999999',
            surl: response.data.paymentData.surl || `${window.location.origin}/payment/success`,
            furl: response.data.paymentData.furl || `${window.location.origin}/payment/failure`,
            // Handle both string and object hash formats
            hash: (() => {
                const hash = response.data.paymentData.hash;
                if (typeof hash === 'string' && hash.startsWith('{')) {
                    try {
                        const parsed = JSON.parse(hash);
                        return parsed.v1 || parsed.hash || hash;
                    } catch (e) {
                        console.warn('Failed to parse hash as JSON:', e);
                        return hash;
                    }
                }
                return hash;
            })(),
            service_provider: 'payu_paisa',
            // Include any additional parameters from the backend
            ...response.data.paymentData
        };
        
        // Debug: Log the final payment data
        console.log('Payment data being submitted:', paymentData);
        
        // Create and submit PayU form
        const paymentForm = document.createElement('form');
        paymentForm.method = 'post';
        paymentForm.action = 'https://test.payu.in/_payment';
        
        // Add all parameters to the form with debug logging
        const formParams = [];
        Object.entries(paymentData).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                const input = document.createElement('input');
                input.type = 'hidden';
                input.name = key;
                input.value = value;
                formParams.push(`${key}=${value}`);
                paymentForm.appendChild(input);
            }
        });
        
        // Debug: Log all form parameters
        console.log('Form parameters:', formParams.join('&'));
        
        // Add the form to the page and submit
        document.body.appendChild(paymentForm);
        
        // Debug: Log the form HTML before submission
        console.log('Form HTML:', paymentForm.outerHTML);
        
        // Submit the form
        paymentForm.submit();

    } catch (error) {
        console.error("PAYMENT_API_ERROR", error);
        toast.error(error.response?.data?.message || "Could not initiate payment");
        dispatch(setPaymentLoading(false));
    } finally {
        toast.dismiss(toastId);
    }
}

// ================ Verify Payment ================
export async function verifyPayment(bodyData, token, navigate, dispatch) {
    const toastId = toast.loading("Verifying Payment...");
    dispatch(setPaymentLoading(true));
    
    try {
        const response = await apiConnector("POST", COURSE_VERIFY_API, {
            ...bodyData,
            // Ensure we're sending the correct field names expected by the backend
            txnid: bodyData.txnid || bodyData.txn_id,
            mihpayid: bodyData.mihpayid || bodyData.payment_id,
            status: bodyData.status || 'success',
            hash: bodyData.hash || bodyData.hash_value,
            productinfo: bodyData.productinfo || 'Course Purchase',
            // Include coursesId if available in the bodyData
            ...(bodyData.coursesId && { coursesId: bodyData.coursesId })
        }, {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        });

        if (!response.data.success) {
            throw new Error(response.data.message || 'Payment verification failed');
        }

        // Send payment success email
        await sendPaymentSuccessEmail(response.data, response.data.amount || bodyData.amount, token);
        
        toast.success("Payment Successful! You are now enrolled in the course");
        dispatch(resetCart());
        navigate("/dashboard/enrolled-courses");
        
    } catch (error) {
        console.error("PAYMENT_VERIFICATION_ERROR", error);
        const errorMessage = error.response?.data?.message || 
                           error.message || 
                           "Payment verification failed. Please contact support.";
        toast.error(errorMessage);
        
        // Optionally redirect to a failure page or show retry options
        if (navigate) {
            navigate("/payment/failure", { 
                state: { 
                    error: errorMessage,
                    courseId: bodyData.coursesId?.[0] 
                } 
            });
        }
    } finally {
        dispatch(setPaymentLoading(false));
        toast.dismiss(toastId);
    }
}

// ================ Send Payment Success Email ================
async function sendPaymentSuccessEmail(response, amount, token) {
    try {
        // Extract payment data from either response.paymentData or root of response
        const paymentData = response.paymentData || response;
        
        // Ensure we have the required data
        if (!paymentData || (!paymentData.txnid && !paymentData.mihpayid)) {
            console.warn("Incomplete payment data for email:", paymentData);
            return;
        }

        await apiConnector("POST", SEND_PAYMENT_SUCCESS_EMAIL_API, {
            orderId: paymentData.txnid || paymentData.txn_id,
            paymentId: paymentData.mihpayid || paymentData.payment_id,
            amount: amount || paymentData.amount,
            // Include additional data that might be useful for the email
            courseName: paymentData.productinfo,
            status: paymentData.status || 'success'
        }, {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        });
    } catch (error) {
        console.error("PAYMENT_SUCCESS_EMAIL_ERROR", error);
        // Don't throw the error to prevent blocking the main flow
        // The email is secondary to the actual payment processing
    }
}
// AUTH , IS STUDENT , IS INSTRUCTOR , IS ADMIN

const jwt = require("jsonwebtoken");
require('dotenv').config();

// ================ AUTH ================
// user Authentication by checking token validating
exports.auth = async (req, res, next) => {
    try {
        // extract token from headers, cookies, or body
        const token = req.body?.token || req.cookies?.token || req.header('Authorization')?.replace('Bearer ', '');
        const refreshToken = req.cookies?.refreshToken;

        // if token is missing
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Token is missing',
                shouldLogout: true
            });
        }

        try {
            // Try to verify the token
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decode;
            return next();
        } catch (error) {
            // If token is expired, try to refresh it
            if (error.name === 'TokenExpiredError') {
                if (!refreshToken) {
                    return res.status(401).json({
                        success: false,
                        message: 'Session expired. Please login again.',
                        shouldLogout: true
                    });
                }

                try {
                    // Verify refresh token
                    const refreshDecoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
                    
                    // Generate new access token
                    const newToken = jwt.sign(
                        { 
                            id: refreshDecoded.id, 
                            email: refreshDecoded.email, 
                            accountType: refreshDecoded.accountType 
                        },
                        process.env.JWT_SECRET,
                        { expiresIn: process.env.JWT_EXPIRE || '24h' }
                    );

                    // Set the new token in response header
                    res.setHeader('New-Access-Token', newToken);
                    
                    // Set the new token in cookies
                    res.cookie('token', newToken, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === 'production',
                        sameSite: 'strict',
                        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
                    });

                    // Continue with the request
                    req.user = refreshDecoded;
                    return next();
                } catch (refreshError) {
                    console.error('Refresh token error:', refreshError);
                    return res.status(401).json({
                        success: false,
                        message: 'Session expired. Please login again.',
                        shouldLogout: true
                    });
                }
            } else {
                // Other JWT verification errors
                return res.status(401).json({
                    success: false,
                    message: 'Invalid token',
                    shouldLogout: true
                });
            }
        }
    } catch (error) {
        console.log('Error while validating token');
        console.log(error);
        
        // Handle specific JWT errors
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                message: 'Invalid token',
                shouldLogout: true
            });
        }
        
        // Handle other errors
        return res.status(500).json({
            success: false,
            message: 'Error while validating token',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}





// ================ IS STUDENT ================
exports.isStudent = (req, res, next) => {
    try {
        // console.log('User data -> ', req.user)
        if (req.user?.accountType != 'Student') {
            return res.status(401).json({
                success: false,
                messgae: 'This Page is protected only for student'
            })
        }
        // go to next middleware
        next();
    }
    catch (error) {
        console.log('Error while cheching user validity with student accountType');
        console.log(error);
        return res.status(500).json({
            success: false,
            error: error.message,
            messgae: 'Error while cheching user validity with student accountType'
        })
    }
}


// ================ IS INSTRUCTOR ================
exports.isInstructor = (req, res, next) => {
    try {
        // console.log('User data -> ', req.user)
        if (req.user?.accountType != 'Instructor') {
            return res.status(401).json({
                success: false,
                messgae: 'This Page is protected only for Instructor'
            })
        }
        // go to next middleware
        next();
    }
    catch (error) {
        console.log('Error while cheching user validity with Instructor accountType');
        console.log(error);
        return res.status(500).json({
            success: false,
            error: error.message,
            messgae: 'Error while cheching user validity with Instructor accountType'
        })
    }
}


// ================ IS ADMIN ================
exports.isAdmin = (req, res, next) => {
    try {
        // console.log('User data -> ', req.user)
        if (req.user.accountType != 'Admin') {
            return res.status(401).json({
                success: false,
                messgae: 'This Page is protected only for Admin'
            })
        }
        // go to next middleware
        next();
    }
    catch (error) {
        console.log('Error while cheching user validity with Admin accountType');
        console.log(error);
        return res.status(500).json({
            success: false,
            error: error.message,
            messgae: 'Error while cheching user validity with Admin accountType'
        })
    }
}



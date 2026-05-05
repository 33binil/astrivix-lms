// Middleware to check if user is either Admin or Instructor
exports.isAdminOrInstructor = (req, res, next) => {
    try {
        if (req.user.accountType !== 'Admin' && req.user.accountType !== 'Instructor') {
            return res.status(403).json({
                success: false,
                message: 'This route is protected for Admin and Instructor only'
            });
        }
        next();
    } catch (error) {
        console.error('Error in isAdminOrInstructor middleware:', error);
        return res.status(500).json({
            success: false,
            message: 'Error while checking user role',
            error: error.message
        });
    }
};

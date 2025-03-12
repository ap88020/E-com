const jwt = require('jsonwebtoken');
const userModel = require('../models/user-model'); // FIXED: Corrected the import path

module.exports = async (req, res, next) => {
    if (!req.cookies.token) {
        req.flash("error", "You need to login first");
        return res.redirect('/');
    }
        let decode = jwt.verify(req.cookies.token, process.env.JWT_KEY);
        console.log("Decoded Token:", decode); // Debugging

        let user = await userModel.findOne({ email: decode.email }).select("-password");

        if (!user) {
            req.flash("error", "User not found. Please log in again.");
            return res.redirect('/');
        }

        req.user = user;
        next();
    
};

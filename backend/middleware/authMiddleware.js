import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            // Get token from Header
            token = req.headers.authorization.split(" ")[1];
            // Verify Token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // Get User from token ( select method to exclude the password field from returned user object)
            req.user = await User.findById(decoded.id).select("-password");
            // NOTE: We need to check if a user was found
            if (!req.user) {
                res.status(401);
                throw new Error("Not authorized");
            }
            // move to next middleware
            next();
        } catch (error) {
            res.status(401);
            throw new Error("Not Authorized!");
        }
    }
    if (!token) {
        res.status(401);
        throw new Error("Not Authorized!");
    }
});

export default protect;

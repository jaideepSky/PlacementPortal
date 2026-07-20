import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
    const token = req.cookies?.token;

    if (!token) {
        throw new ApiError(401, "Unauthorized access");
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();
    } catch (error) {
        throw new ApiError(401, "Invalid or expired token");
    }
});
import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { jwt } from "jsonwebtoken";

export const verifJWT = asyncHandler(async (req, _, next) => {
    try {
        const token = req.cookies?.accessToken || req.header
            ("Authorization")?.replace("Bearer ", "")

        if (!token) {
            throw new ApiError(401, "unauthorized requerst ")
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")

        if (!user) {
            throw new ApiError(401, "Invalid AccessToken ")
        }
        req.user = user;
        next();
    } catch (error) {
        console.error(error);
        // if (error.name === "JsonWebTokenError") {
        //     return next(new ApiError(401, "Invalid token"));
        // }
       throw new ApiError(401,error?.message|| "Invalid token");

    }
})

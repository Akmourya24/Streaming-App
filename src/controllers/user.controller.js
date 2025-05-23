import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import uploadONCloudinary from "../utils/Cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const userRegister = asyncHandler(async (req, res) => {
    const { fullname, email, username, password } = req.body;
    if (
        [username, fullname, email, password].some((field) =>
            (field?.trim() === "")
        )
    ) {
        throw new ApiError(400, "all field are required")
    }
    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })
    if (existedUser) {
        throw new ApiError(409, "user already exists")
    }
    const avatarLocalPath = req.files?.avatar[0]?.path
    const coverLocalPath = req.files?.cover[0]?.path
    if (!avatarLocalPath) {
        throw new ApiError(400, "avatar are required");
    }
    const avatar = await uploadONCloudinary(avatarLocalPath);
    const cover = await  uploadONCloudinary(coverLocalPath);
    if (!avatar) {
        throw new ApiError(500, "avatar upload failed")
    }

    const user = await User.create({
        fullname,
        email,
        password,
        avatar: avatar.url,
        cover: cover?.url || "",
        username: username.toLowerCase(),
    })

    const createduser = await User.findById(user._id).select(
        "-password -refreshToken -__v -createdAt -updatedAt"
    )
    if (!createduser) {
        throw new ApiError(500, "user not found")
    }
    return res.status(201).json(

        new ApiResponse(200, createduser, "user created successfully")
    )

});



export { userRegister }
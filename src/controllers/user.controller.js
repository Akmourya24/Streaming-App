import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import {User} from "../models/user.model.js";
import uploadONCloudinary from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const userRegister = asyncHandler(async (req, res) => {
    const { fullname, email, username, password } = req.body;
    console.log("fullname", fullname);
    console.log("email", email);

    if (
        [username, fullname, email, password].some((field) =>
            (field?.trim() === "")
        )
    ){
        throw new ApiError(400,"all field are required")
    }

    User.findOne({
        $or:[{username},{email}]
    })
    if(existedUser){
        throw new ApiError(409, "user already exists")
    }

    const avaterLocalPath =req.files?.avater[0]?.path
    const coverLocalPath = req.files?.cover[0]?.path

    if (!avaterLocalPath) {
        throw new ApiError(400, "avater are required");
    }
    const avater = await uploadONCloudinary(avaterLocalPath);
    const cover = await coverLocalPath ? uploadONCloudinary(coverLocalPath) : null;

    if(!avater){
        throw new ApiError(500, "avater upload failed")
    }

   const user = await User.create({
        fullname,
        email,
        password,
        avater:avater.url,
        cover:cover?.url|| "",
        username:username.toLowerCase(),
    })

   const createduser =await User.findById(user._id).select(
        "-password -refreshToken -__v -createdAt -updatedAt"
    )    
if(!createduser){
    throw new ApiError(500, "user not found")
}
return res.status(201).json(

    new ApiResponse(200, createduser, "user created successfully")
)

});



export { userRegister }
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import uploadONCloudinary from "../utils/Cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";


// Function to generate access and refresh tokens for a user
// This function takes a userId, finds the user, generates tokens, saves the refresh token, and returns both tokens.
const generateAccessTokenandRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;// Save the refresh token in the user document
        // Save the user document without validating the fields
        await user.save({ validateBeforeSave: false });

        return {
            accessToken,
            refreshToken
        }
    } catch (error) {
        throw new ApiError(500, "Error generating tokens");
    }
};
// This function handles user registration by validating input, checking for existing users, uploading avatar and cover images, and creating a new user in the database.
const userRegister = asyncHandler(async (req, res) => {
    const { fullname, email, username, password } = req.body;
    console.log("req.body", req.body);
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
    // const coverLocalPath = req.files?.cover[0]?.path

    let coverLocalPath = "";
    if (req.files && Array.isArray(req.files.cover) && req.files.cover.length > 0) {
        coverLocalPath = req.files?.cover[0]?.path
        // console.log("req.files", req.files);
    }
    if (!avatarLocalPath) {
        throw new ApiError(400, "avatar are required");
    }
    const avatar = await uploadONCloudinary(avatarLocalPath);
    const cover = await uploadONCloudinary(coverLocalPath);
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
// This function handles user login by validating input, checking for existing users, verifying passwords, generating access and refresh tokens, and returning the user data along with the tokens.
const loginUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
   
    if (!email && !username) {
        throw new ApiError(400, "email or username is requied")
    }

    const userfind = await User.findOne({
        $or: [{ email }, { username }]
    })
    if (!userfind) {
        throw new ApiError(404, "User does not exist");

    }
    const isPasswordValid = await userfind.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new ApiError(401, "password is incorrect")
    }
    // Generate access and refresh tokens for the user
    const { accessToken, refreshToken } = await generateAccessTokenandRefreshToken(userfind._id);
    // Set options for the cookies
    // The cookies will be HTTP-only and secure (only sent over HTTPS)
    const option = {
        httpOnly: true,
        secure: true,
    };

    const userLoggedIn = await User.findById(userfind._id).select(
        "-password -refreshToken -__v -createdAt -updatedAt"  // Exclude sensitive fields not send user 
    );
    console.log("user login successfully", userLoggedIn);

    return res
        .status(200).
        cookie("refreshToken", refreshToken, option).
        cookie("accessToken", accessToken, option).
        json(
            new ApiResponse(200,
                { user: userLoggedIn, accessToken, refreshToken },
                "user logged in successfully"
            )
        )

})

const logoutUser = asyncHandler(async (req, res) => {
    User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined // Clear the refresh token
            }
        },
        {
            new: true // Return the updated value
        }
    )
    const option = {
        httpOnly: true,
        secure: true,
    };
    console.log("user logged out successfully");
    return res.
        status(200).
        cookie("refreshToken", option).
        cookie("accessToken", option).
        json(new ApiResponse(200, {}, "user logged out"))
})

export {
    userRegister,
    loginUser,
    logoutUser
};
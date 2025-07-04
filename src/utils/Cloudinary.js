import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
     api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,

});
// src/utils/Cloudinary.js
const uploadONCloudinary = async (filePath) => {
    try {
        if (!filePath) {
            throw new Error("file path is required");
        }
        const result = await cloudinary.uploader.upload(filePath, {
            folder: "avatar",
            resource_type: "auto",
        });
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
        return { url: result.secure_url };
    } catch (error) {
        console.error("Cloudinary upload error:", error.message);

        //Clean up local file even if upload fails
        if (filePath && fs.existsSync(filePath)) {
            try {
                fs.unlinkSync(filePath);
                console.log("Local file cleaned up after error:", filePath);
            } catch (cleanupError) {
                console.error("Failed to cleanup local file:", cleanupError.message);
            }
        }
    }
};
export default uploadONCloudinary;


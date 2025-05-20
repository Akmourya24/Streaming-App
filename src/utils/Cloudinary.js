import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadONCloudinary = async (filePath) => {
    try {
        if (!filePath) return null;
        const result = await cloudinary.uploader.upload(filePath, {
            resource_type: "auto",
        });
        console.log("Cloudinary upload result:", result.url);
        return result.url; // Return the URL of the uploaded file


    } catch (error) {
        fs.unlinkSync(filePath); // Delete the file from local storage if upload fails
        return null; // Return null if upload fails
    }

};


export default uploadONCloudinary;



import mongoose,{Schema} from "mongoose";

const videoSchema =new Schema(
    {
        videoFile:{
            type:String, //cloudinary url
            requried :true
        },
        thumbnail:{
            type:String,   //cloudinary url
            required:true
        },
        title:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true
        },
        duration:{
            type:Number,
            required:true
        },
        views:{
            type:Number,
            default:0
        },
        isPublished:{
            type:Boolean,
            default:false
        },
        owner:{
            type:Schema.Types.ObjectId,
            ref:"User"
        }
    },
    {timestamps:true}
)

export const Video = mongoose.model("Video",videoSchema); // Export the model for use in other files
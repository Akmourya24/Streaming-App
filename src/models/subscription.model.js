import mongoose, { Schema } from "mongoose";

const subcriptionSchema = new mongoose.Schema(
    {
        subscriber:{
            type:Schema.types.ObjectId,
            ref:"User",
        },
        chennels:{
            type:Schema.Types.ObjectId,
            ref:"User",
        },

    }
)

export const Subscription = mongoose.model("Subscription",subcriptionSchema); // Export the model for use in other files
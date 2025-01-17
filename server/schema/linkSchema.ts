import mongoose from "mongoose";


const linkSchema = new mongoose.Schema({
    hash: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {timestamps: true})


export const Link = mongoose.model("Link", linkSchema)

import mongoose from "mongoose";


const linkSchema = new mongoose.Schema({
    hash: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {timestamps: true})


export const LinkModel = mongoose.model("Link", linkSchema)

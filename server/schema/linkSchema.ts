import {model, Schema} from "mongoose";


const linkSchema = new Schema({
    hash: {
        type: String,
        require: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    }
}, {timestamps: true})


export const LinkModel = model("Link", linkSchema)

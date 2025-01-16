import { model, Schema } from "mongoose";
import { User } from "./userSchema";

const contentSchema = new Schema({
    type:{
        type: String,
        required: true,

    },
    link: {
        type: String,
        required: true,
    },
    title:{
        type: String,
        required: true
    },
    tags:{
        type: [],
        required: true
    },
    userId:{
        type: Schema.Types.ObjectId,
        red: User
    }
}, {timestamps: true});

const Content = model("Content", contentSchema)
export default Content;
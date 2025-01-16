import { model, Schema } from "mongoose";

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
    }
}, {timestamps: true});

const Content = model("Content", contentSchema)
export default Content;
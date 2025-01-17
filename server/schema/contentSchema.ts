import { model, Schema } from "mongoose";

const contentSchema = new Schema({
    type:{
        type: String,
        required: true,

    },
    link: {
        type: String,
       
    },
    title:{
        type: String,
        required: true
    },
    tags:{
        type: {type: Schema.Types.ObjectId,  ref: 'Tag'},
        required: true
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {timestamps: true});

const Content = model("Content", contentSchema)
export default Content;
import { model, Schema } from "mongoose";
const contentTypes = ['image', 'video', 'article', 'audio']; 
const contentSchema = new Schema({
    type:{
        type: String,
        enum: contentTypes,
        required: true,

    },
    link: {
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    tags:{
        type: {type: Schema.Types.ObjectId,  ref: 'Tag'},
        
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {timestamps: true});

const Content = model("Content", contentSchema)
export default Content;
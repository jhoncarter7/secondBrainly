
import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
         userName: {
            type: String,
            require: true,
            unique: true,
            lowercase: true,
            trim: true,
         
         },
         
         password:{
            type: String,
            require: [true, 'password is required'],
         }
}, {timestamps: true})


userSchema.pre('save', function(next) {
if(this.isModified('password')){
    if (typeof this.password === 'string') {
        this.password = bcrypt.hashSync(this.password, 10);
    }
}
next();
})

export const User = mongoose.model('User', userSchema);
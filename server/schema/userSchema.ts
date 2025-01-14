
import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
         userName: {
            type: String,
            require: true,
            unique: true,
            lowercase: true,
            trim: true,
            min: 3,
            max: 10
         
         },
         
         password:{
            type: String,
            require: [true, 'password is required'],
             min: 8,
             max: 20,
             
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
import { Request, Response } from "express";
import { User } from "../schema/userSchema";



const userSignUp = async (req: Request<String, String>, res: Response) => {
    const { userName, password } = req.body;
try {
    const userExist = await User.findOne({userName})

    if(userExist){
        res.status(400).json({message: "User already exist"})
        return;
    }

    const user = await User.create({userName, password})
    
    if(user){
        res.status(201).json({message: "User created successfully"})
        return;
    }else{
        res.status(400).json({message: "UserName and password are required"})
    }
   
} catch (error) {

    console.log("error while creating user", error)
}
}

export { userSignUp };
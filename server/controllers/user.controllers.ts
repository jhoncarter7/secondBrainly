import { Request, Response } from "express";
import { User } from "../schema/userSchema";



const userSignUp = async (req: Request<String, String>, res: Response) => {
    const { userName, password } = req.body;
try {


    if(userName.length < 3 || password.length <8){
        res.status(411).json({message: "error in input"})
        return;
    }

    const userExist = await User.findOne({userName})

    if(userExist){
        res.status(403).json({message: "User already exist with this username"})
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

const userSignin = async (req: Request<String, String>, res: Response) =>{
  const {userName, password} = req.body;
    try {
        if(userName.lrngth <3 ||password.length < 8 ){
            res.status(411).json({message: "error in input"})
            return;
        }

        const userExist = await User.findOne({
            userName
        })

        if(!userExist){
            res.status(403).json({message: "wrong username or password"})
            return;
        }
        res.status(200).json({message: "user logged in successfully"});
    } catch (error) {
        res.status(500).json({message: `internal server error ${error}`})
    }
}

export { userSignUp, userSignin };
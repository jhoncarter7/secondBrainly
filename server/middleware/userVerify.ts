import { Request, Response, NextFunction } from "express";
import jwt  from "jsonwebtoken";
import { User } from "../schema/userSchema";

// 

// const userVerify = async(req: custumeRequest, res: Response): Promise<void> => {

const userVerify = async (req: Request, _: Response, next: NextFunction) => {

    try {
        const token = req.cookies?.accessToken || req.headers['authorization']?.split(' ')[1];
        console.log("cookies", req.cookies, req.cookies?.accessToken, "header", token);

        const decodeToken = jwt.verify(token, process.env.JWT_SECRET as string) as jwt.JwtPayload;
        if (!decodeToken) {
            throw new Error("Invalid Token");
        }
        const user = await User.findById(decodeToken.id).select('-password') as any;
        if (!user) {
            throw new Error("User not found");
        }
        req.user = user;
        next();
    } catch (error) {
        throw new Error(`error while verifying user: ${error}`);
    }
}


export default userVerify;

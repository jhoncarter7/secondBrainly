import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import {  Types } from "mongoose";
import { User } from "../schema/userSchema";

interface custumeRequest extends Request {
    userId: Types.ObjectId

}

// const userVerify = async(req: custumeRequest, res: Response): Promise<void> => {

const userVerify = async (req: custumeRequest,_:Response, next: NextFunction) => {

    try {
        const token = req.cookies?.access_token || req.headers['authorization']?.split(' ')[1];
        console.log("cookies", req.cookies, "header", req.headers, "entire req", req);

        const decodeToken = jwt.verify(token, process.env.JWT_SECRET as string) as jwt.JwtPayload;
        if (!decodeToken) {
            throw new Error("Invalid Token");
        }
        const user = await User.findById(decodeToken.id).select('-password');
        if (!user) {
            throw new Error("User not found");
        }
        req.userId = user?._id;
        next();
    } catch (error) {
        throw new Error(`error while verifying user: ${error}`);
    }
}

export default userVerify;
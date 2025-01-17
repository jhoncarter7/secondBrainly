import {Request, Response } from "express";
import Content from "../schema/contentSchema";


interface CustomRequest extends Request {
    user?: { id: string, userName: string };

}
const createContent = async(req: CustomRequest, res: Response)=> {
    const {type, link, title, tags} = req.body;
    try {
        const content = await Content.create({type, link, title, tags, userId: req.user?.id })
        res.status(201).json({
            message: "Content created successfully",
        })
    } catch (error) {
        throw new Error(`error while creating content: ${error}`) 
    }
}

const getContent = async(req: CustomRequest, res: Response)=>{

    try {
        const allContent = await Content.find({
            $and: [{userId: req.user?.id}, {userName: req.user?.userName}]
        })

        if(allContent.length === 0){
            res.status(200).send("No content found")
            return;
        }

        res.status(200).json({content: allContent, message: "Content found successfully"})
    } catch (error) {
        throw new Error(`error while getting content: ${error}`)
    }
}
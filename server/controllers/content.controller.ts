import {Request, Response } from "express";
import Content from "../schema/contentSchema";



const createContent = async(req: Request, res: Response): Promise<void>=> {
    const {type, link, title} = req.body;
    try {
        const content =  await Content.create({type, link, title, tags: [], userId: req.user?._id });
        if(!content){
            res.status(400).json({
                message: "Content not created"
            })
            return;
        }
        res.status(201).json({
            message: "Content created successfully",
        })
    } catch (error) {
        throw new Error(`error while creating content: ${error}`) 
    }
}

const getContent = async(req: Request, res: Response)=>{

    try {
        const allContent = await Content.find({
            userId: req.user?._id
        }).populate('userId', 'userName');

        if(allContent.length === 0){
            res.status(200).send("No content found")
            return;
        }

        res.status(200).json({content: allContent, message: "Content found successfully"})
    } catch (error) {
        throw new Error(`error while getting content: ${error}`)
    }
}

const deleteContent = async(req: Request, res: Response) => {
    try {
        const content = await Content.findByIdAndDelete({_id: req.params.id})
        if(!content){
            res.status(404).json({message: "Content not found"})
            return;
        }
        res.status(200).json({message: "Content deleted successfully"})
    } catch (error) {
        throw new Error(`error while deleting content: ${error}`)   
    }
}

export {createContent, getContent, deleteContent};

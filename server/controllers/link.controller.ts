import { Request, Response } from "express"
import { LinkModel } from "../schema/linkSchema"
import { random } from "../utils/utils"
import Content from "../schema/contentSchema"
import { User } from "../schema/userSchema"


const generateShareLink = async (req: Request, res: Response) => {
    const share = req.body.share
    try {
        if (share) {
            const ExistingLink = await LinkModel.findOne({
                userId: req.user?._id
            })

            if (ExistingLink) {
                res.status(200).json({
                    success: true,
                    hash: ExistingLink.hash,
                })
                return;
            }

            const hash = random(10);
            const link = await LinkModel.create({
                hash: hash,
                userId: req.user?._id,
            })

            if (link) {
                res.status(201).json({
                    success: true,
                    hash: link.hash
                })
                return;
            }


        } else {
            await LinkModel.deleteOne({
                userId: req.user?._id
            })
            res.json({
                message: "Link deleted successfully"
            })
        }

    } catch (error) {
        throw new Error(`got error while link creating ${error}`)
    }
}

const shareableLink = async (req: Request, res: Response) => {
    const { shareId } = req.params;
    try {
        const findHash = await LinkModel.findOne({
            hash: shareId
        })

        if (!findHash) {
            res.status(411).json({ message: "sorry incorrect input" });
            return;
        }

        const content = await Content.find({
            userId: findHash?.userId
        })

        if (!content) {
            res.status(411).json({
                message: "user not found"
            })
        }
        console.log("hash ", findHash)
        const user = await User.findById({
            _id: findHash.userId
        })
        res.status(201).json({
            user: user?.userName,
            content: content
        })

    } catch (error) {
        throw new Error(`some error in link creation ${error}`)
        
    }
}

export {shareableLink, generateShareLink};
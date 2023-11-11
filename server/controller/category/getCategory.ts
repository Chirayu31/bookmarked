import { Request, Response } from "express";
import Category from "../../models/Category";

export default async function getCategory(req: Request, res: Response) {
    try {
        const id = req.body.user.userId
        const categories = await Category.find({ userId: id })

        return res.json({ categories })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error" })
    }

}
import { Request, Response } from "express";
import Category from "../../models/Category";

export default async function getCategoryById(req: Request, res: Response) {
    try {
        const categoryId = req.params.id
        const category = await Category.findById(categoryId)

        return res.json({ category })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error" })
    }

}
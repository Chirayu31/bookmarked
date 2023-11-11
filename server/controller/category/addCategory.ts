import { Request, Response } from "express";
import Category from "../../models/Category";
import { z } from 'zod'

const categorySchema = z.object({
    userId: z.string(),
    title: z.string().min(1).max(100),
});

export default async function addCategory(req: Request, res: Response) {
    try {
        const data = { userId: req.body.user.userId, title: req.body.title };

        const result = categorySchema.safeParse(data);

        if (!result.success) {
            return res.status(400).json({ message: "Invalid data", errors: result.error.errors });
        }

        const { userId, title } = result.data;

        const newCategory = new Category({ userId: userId, title: title });
        await newCategory.save();

        return res.status(201).json({ message: "Category added successfully", category: newCategory });
    } catch (error) {
        console.error("Error in addCategory:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
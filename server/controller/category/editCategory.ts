import { Request, Response } from "express";
import mongoose from "mongoose";
import Category from "../../models/Category";
import { z } from 'zod';

const categorySchema = z.object({
    userId: z.string(),
    title: z.string().min(1).max(100),
    categoryId: z.string(),
});

export default async function editCategory(req: Request, res: Response) {
    try {
        const data = { userId: req.body.user.userId, title: req.body.title, categoryId: req.params.id };

        const result = categorySchema.safeParse(data);

        if (!result.success) {
            return res.status(400).json({ message: "Invalid data", errors: result.error.errors });
        }

        const { userId, title, categoryId } = result.data;

        if (!mongoose.isValidObjectId(categoryId))
            return res.json({ message: "Invalid category" })

        const existingCategory = await Category.findById(categoryId);

        if (!existingCategory) {
            return res.status(404).json({ message: "Category not found" });
        }

        if (String(existingCategory.userId) !== userId) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        existingCategory.title = title;
        await existingCategory.save();

        return res.status(200).json({ message: "Category updated successfully", category: existingCategory });
    } catch (error) {
        console.error("Error in editCategory:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

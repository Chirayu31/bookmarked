import { Request, Response } from "express";
import mongoose from "mongoose";
import Category from "../../models/Category";
import { z } from 'zod';

const categorySchema = z.object({
    userId: z.string(),
    categoryId: z.string(),
});

export default async function deleteCategory(req: Request, res: Response) {
    try {
        const data = { userId: req.body.user.userId, categoryId: req.params.id };

        const result = categorySchema.safeParse(data);

        if (!result.success) {
            return res.status(400).json({ message: "Invalid data", errors: result.error.errors });
        }

        const { userId, categoryId } = result.data;

        if (!mongoose.isValidObjectId(categoryId))
            return res.json({ message: "Invalid category" })

        const existingCategory = await Category.findById(categoryId);

        if (!existingCategory) {
            return res.status(404).json({ message: "Category not found" });
        }

        if (String(existingCategory.userId) !== userId) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        await existingCategory.deleteOne();

        return res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
        console.error("Error in deleteCategory:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

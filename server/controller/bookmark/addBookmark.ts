import { Request, Response } from 'express';
import Bookmark from '../../models/Bookmark';
import { z } from 'zod';
import mongoose from 'mongoose';

const bookmarkSchema = z.object({
    userId: z.string(),
    categoryId: z.string(),
    url: z.string().url(),
    title: z.string()
});

export default async function addBookmarkController(req: Request, res: Response) {
    try {
        const data = { userId: req.body.user.userId, ...req.body };
        const result = bookmarkSchema.safeParse(data);

        if (!result.success) {
            return res.status(400).json({ message: 'Invalid data', errors: result.error.errors });
        }

        const { userId, categoryId, url, title } = result.data;

        if (!mongoose.isValidObjectId(userId) || !mongoose.isValidObjectId(categoryId))
            return res.status(400).json({ message: "Invalid category/user id" })

        const newBookmark = new Bookmark({ userId, categoryId, url, title });
        await newBookmark.save();

        return res.status(201).json({ message: 'Bookmark added successfully', bookmark: newBookmark });
    } catch (error) {
        console.error('Error in postBookmark:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

import { Request, Response } from 'express';
import Bookmark from '../../models/Bookmark';
import { z } from 'zod';
import mongoose from 'mongoose';

const bookmarkSchema = z.object({
    userId: z.string(),
    categoryId: z.string(),
    url: z.string().url(),
});

export default async function editBookmarkController(req: Request, res: Response) {
    try {
        const bookmarkId = req.params.id;
        const data = { userId: req.body.user.userId, ...req.body };

        const result = bookmarkSchema.safeParse(data);

        if (!result.success) {
            return res.status(400).json({ message: 'Invalid data', errors: result.error.errors });
        }

        const { userId, categoryId, url } = result.data;

        if (!mongoose.isValidObjectId(userId) || !mongoose.isValidObjectId(categoryId))
            return res.status(400).json({ message: "Invalid category/user id" })

        const existingBookmark = await Bookmark.findById(bookmarkId);

        if (!existingBookmark) {
            return res.status(404).json({ message: 'Bookmark not found' });
        }

        if (String(existingBookmark.userId) !== userId) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        existingBookmark.categoryId = categoryId;
        existingBookmark.url = url;
        await existingBookmark.save();

        return res.status(200).json({ message: 'Bookmark updated successfully', bookmark: existingBookmark });
    } catch (error) {
        console.error('Error in editBookmark:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

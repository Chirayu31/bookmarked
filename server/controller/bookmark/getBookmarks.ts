import { Request, Response } from 'express';
import Bookmark from '../../models/Bookmark';
import mongoose from 'mongoose';

export default async function getBookmarksController(req: Request, res: Response) {
    try {
        const { categoryId } = req.params;
        const { userId } = req.body.user;

        if (!mongoose.isValidObjectId(userId) || !mongoose.isValidObjectId(categoryId))
            return res.status(400).json({ message: "Invalid category/user id" })

        const bookmarks = await Bookmark.find({ userId, categoryId });

        return res.status(200).json({ bookmarks });
    } catch (error) {
        console.error('Error in getBookmarks:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

import { Request, Response } from 'express';
import Bookmark from '../../models/Bookmark';
import mongoose from 'mongoose';

export default async function deleteBookmarkController(req: Request, res: Response) {
    try {
        const bookmarkId = req.params.id;
        const { userId } = req.body.user;

        if (!mongoose.isValidObjectId(userId) || !mongoose.isValidObjectId(bookmarkId))
            return res.status(400).json({ message: "Invalid category/user id" })

        const existingBookmark = await Bookmark.findById(bookmarkId);

        if (!existingBookmark) {
            return res.status(404).json({ message: 'Bookmark not found' });
        }

        if (String(existingBookmark.userId) !== userId) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        await existingBookmark.deleteOne();

        return res.status(200).json({ message: 'Bookmark deleted successfully' });
    } catch (error) {
        console.error('Error in deleteBookmark:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

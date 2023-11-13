import { Request, Response } from 'express';
import mongoose from 'mongoose';
import User from '../../models/User';

export default async function getUserController(req: Request, res: Response) {
    try {
        const { userId } = req.body.user;

        if (!mongoose.isValidObjectId(userId))
            return res.status(400).json({ message: "Invalid category/user id" })

        const user = await User.findById(userId).select('username email')

        return res.status(200).json(user);
    } catch (error) {
        console.error('Error in getUser:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

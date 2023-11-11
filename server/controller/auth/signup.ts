import { Request, Response } from "express";
import { z } from "zod";
import User from "../../models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const signupSchema = z.object({
    username: z.string().min(4).max(50),
    email: z.string().email(),
    password: z.string().min(6).max(50)
})

const saltRounds = 8

export default async function signup(req: Request, res: Response) {
    const result = signupSchema.safeParse(req.body)

    if (!result.success) {
        return res.status(400).json({ message: 'Invalid Data', error: result.error })
    }

    const { username, email, password } = result.data;

    try {
        const existingUser = await User.findOne({
            $or: [
                { username: username },
                { email: email }
            ]
        });

        if (existingUser) {
            return res.status(400).json({ message: "User with this email/username exists" });
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const createdUser = new User({ username, email, password: hashedPassword });
        await createdUser.save();

        const secret = process.env.JWT_SECRET;

        const token = jwt.sign({ userId: createdUser._id }, secret, {
            expiresIn: "365d",
        });

        res.json({ token });

    } catch (error) {
        console.error("Error in signup:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }

}
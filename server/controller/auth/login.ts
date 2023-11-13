import { Request, Response } from "express";
import { z } from "zod"
import bcrypt from "bcrypt";
import User from "../../models/User";
import jwt from "jsonwebtoken"

const loginSchema = z.object({
    username: z.string(),
    password: z.string()
})

export default async function login(req: Request, res: Response) {
    const result = loginSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({ message: 'Invalid Data', error: result.error })
    }

    const { username, password } = result.data;
    try {
        const user = await User.findOne({ username })

        if (!user) {
            return res.status(404).json({ message: 'Username not found' })
        }

        const pwdCheck = await bcrypt.compare(password, user.password)

        if (!pwdCheck) {
            return res.status(400).json({ message: 'Incorrect Password' })
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "365d" })

        return res.json({ token, username: user.username, email: user.email })
    } catch (error) {
        console.error("Error in signup:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }

}
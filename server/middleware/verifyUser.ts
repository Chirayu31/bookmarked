import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export default function verifyUser(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const decoded = verify(token, process.env.JWT_SECRET);

        req.body.user = decoded

        next()

    } catch (error) {
        return res.status(401).send('Please authenticate');
    }
}
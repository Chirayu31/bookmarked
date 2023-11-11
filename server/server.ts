import express, { Request, Response } from 'express'
import dotenv from 'dotenv';
import connectDB from './utils/dbConfig';

const app = express();
const port = 3000;

dotenv.config()

connectDB()

app.get('/', (req: Request, res: Response) => {
    res.send("Hello World")
})

app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})
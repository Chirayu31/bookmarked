import express, { Request, Response } from 'express'
import dotenv from 'dotenv';
import connectDB from './utils/dbConfig';
import { authRoutes } from './routes';

const app = express();
const port = 3000;

app.use(express.json());

dotenv.config()

connectDB()

app.get('/', (req: Request, res: Response) => {
    res.send("Hello World")
})

app.use('/auth', authRoutes)

app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})
import express, { Request, Response } from 'express'
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './utils/dbConfig';
import { authRoutes, bookmarkRoutes, categoryRoutes, userRoutes } from './routes';
import verifyUser from './middleware/verifyUser';

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

dotenv.config()

connectDB()

app.get('/', (req: Request, res: Response) => {
    res.send("Hello World")
})

app.use('/auth', authRoutes)
app.use('/user', verifyUser, userRoutes)
app.use('/category', verifyUser, categoryRoutes)
app.use('/bookmark', verifyUser, bookmarkRoutes)

app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})
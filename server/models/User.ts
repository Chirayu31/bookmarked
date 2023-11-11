import mongoose from 'mongoose'
import { IUser } from '../types/user'

const userSchema = new mongoose.Schema<IUser>({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User
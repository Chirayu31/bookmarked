import express from 'express'
import signup from '../controller/auth/signup';
import login from '../controller/auth/login';

const router = express.Router();

router.post('/login', login)
router.post('/signup', signup)

export default router
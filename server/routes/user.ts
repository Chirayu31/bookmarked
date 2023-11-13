import express from 'express'
import getUserController from '../controller/user/getDetails';
const router = express.Router();

router.get('/', getUserController)

export default router
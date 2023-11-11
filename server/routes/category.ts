import express from 'express'
import getCategory from '../controller/category/getCategory'

const router = express.Router()

router.get('/', getCategory)
router.post('/')
router.put('/:id')
router.delete('/:id')

export default router
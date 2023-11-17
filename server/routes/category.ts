import express from 'express'
import getCategory from '../controller/category/getCategory'
import addCategory from '../controller/category/addCategory'
import editCategory from '../controller/category/editCategory'
import deleteCategory from '../controller/category/deleteCategory'
import getCategoryById from '../controller/category/getCategoryById'

const router = express.Router()

router.get('/', getCategory)
router.get('/:id', getCategoryById)
router.post('/', addCategory)
router.put('/:id', editCategory)
router.delete('/:id', deleteCategory)

export default router
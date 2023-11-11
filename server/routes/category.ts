import express from 'express'
import getCategory from '../controller/category/getCategory'
import addCategory from '../controller/category/addCategory'
import editCategory from '../controller/category/editCategory'
import deleteCategory from '../controller/category/deleteCategory'

const router = express.Router()

router.get('/', getCategory)
router.post('/', addCategory)
router.put('/:id', editCategory)
router.delete('/:id', deleteCategory)

export default router
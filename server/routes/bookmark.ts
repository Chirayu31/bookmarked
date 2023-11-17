import express from 'express'
import getBookmarksController from '../controller/bookmark/getBookmarks'
import addBookmarkController from '../controller/bookmark/addBookmark'
import editBookmarkController from '../controller/bookmark/editBookmark'
import deleteBookmarkController from '../controller/bookmark/deleteBookmark'

const router = express.Router()

router.get('/:categoryId', getBookmarksController)
router.post('/', addBookmarkController)
router.put('/:id', editBookmarkController)
router.delete('/:id', deleteBookmarkController)

export default router
import { Router } from 'express'
import { getCategories, createCategory, getCategoryById } from '../controllers/categories.controller.js'

const router = Router();

router.get('/categories', getCategories)

router.get('/categories/:id', getCategoryById)

router.post('/categories', createCategory)


export default router

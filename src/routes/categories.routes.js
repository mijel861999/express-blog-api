import { Router } from 'express'
import CategoryController from '../controllers/categories.controller.js'

const categoryController = new CategoryController()

const router = Router();

router.get('/categories', categoryController.getCategories)

router.get('/categories/:id', categoryController.getCategoryById)

router.post('/categories', categoryController.createCategory)


export default router

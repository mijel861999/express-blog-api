import { Router } from 'express'
//import { createUser, getUserById, authenticateUser } from '../controllers/users.controller.js'
import UserController from '../controllers/users.controller.js'
import verifyToken from '../middlewares/auth/verifyToken.js'

const userController = new UserController()

const router = Router();

// router.get('/users/:id', verifyToken ,getUserById)

router.post('/users', userController.createUser)

router.post('/users/login', userController.authenticateUser)

export default router

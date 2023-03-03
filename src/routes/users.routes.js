import { Router } from 'express'
import { createUser, getUserById, authenticateUser } from '../controllers/users.controller.js'
import verifyToken from '../middlewares/auth/verifyToken.js'

const router = Router();

router.get('/users/:id', verifyToken ,getUserById)

router.post('/users', createUser)

router.post('/users/login', authenticateUser)


export default router

import { Router } from 'express'
import { getPong } from '../controllers/index.controller.js'

const router = Router();

router.get('/', getPong)

export default router

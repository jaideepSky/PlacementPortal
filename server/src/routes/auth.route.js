import express from 'express'
import { getme, loginUser, logoutUser, registerUser } from '../controllers/auth.controller.js'
import { validate } from '../middlewares/validate.middleware.js'
import { loginSchema, registerSchema } from '../validator/auth.validator.js'
import { verifyJWT } from '../middlewares/verifyJWT.middleware.js'

const router = express.Router()

router.post('/register',validate(registerSchema),registerUser)
router.post('/login',validate(loginSchema),loginUser)
router.get('/me',verifyJWT,getme)
router.post('/logout',logoutUser)

export default router
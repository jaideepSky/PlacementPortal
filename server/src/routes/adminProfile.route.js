import express from 'express'
import { isLoggedIn } from '../middlewares/protect.middleware.js'
import authorise from '../middlewares/authorise.midlleware.js'
import { getAdminProfile } from '../controllers/adminProfile.controller.js'
const router = express.Router()
router.get('/adminData',isLoggedIn,authorise("admin") , getAdminProfile)
export default router
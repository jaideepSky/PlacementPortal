import express from 'express'
import { isLoggedIn } from '../middlewares/protect.middleware.js'
import authorise from '../middlewares/authorise.midlleware.js'
import { createCompany } from '../controllers/company.controller.js'
const router = express.Router()
router.post('/create',isLoggedIn , authorise("admin"),createCompany)

export default router
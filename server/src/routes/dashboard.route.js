import express from 'express'
import { isLoggedIn } from '../middlewares/protect.middleware.js'
import authorise from '../middlewares/authorise.midlleware.js'
import { getAdminDashboard, getStudentDashboard } from '../controllers/dashboard.controller.js'
const router =  express.Router()
router.get('/student/dashboard',isLoggedIn , authorise("student"),getStudentDashboard)
router.get('/admin/dashboard',isLoggedIn , authorise("admin"),getAdminDashboard)

export default router
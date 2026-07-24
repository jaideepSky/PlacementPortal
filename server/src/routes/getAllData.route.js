import express from 'express'
import { isLoggedIn } from '../middlewares/protect.middleware.js'
import authorise from '../middlewares/authorise.midlleware.js'
import { getAllApplications, getAllStudents } from '../controllers/getAllData.controller.js'
const router = express.Router()
router.get('/student/allData',isLoggedIn,authorise("admin"),getAllStudents)
router.get('/application/allData',isLoggedIn,authorise("admin"),getAllApplications)

export default router
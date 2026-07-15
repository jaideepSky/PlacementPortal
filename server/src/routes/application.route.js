import express from 'express'
import { isLoggedIn } from '../middlewares/protect.middleware.js'
import authorise from '../middlewares/authorise.midlleware.js'
import { applyCompany, getApplication, updateApplication } from '../controllers/application.controller.js'
const router = express.Router()

router.post('/apply/:companyId' ,isLoggedIn , authorise("student") ,applyCompany )
router.get('/my' ,isLoggedIn , authorise("student") ,getApplication )
router.get('/company/:companyId' ,isLoggedIn , authorise("admin") ,getAllApplication )
router.patch('/:applicationId/status' ,isLoggedIn , authorise("admin") ,updateApplication )

export default router
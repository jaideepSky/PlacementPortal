import express from 'express'
import { isLoggedIn } from '../middlewares/protect.middleware.js'
import authorise from '../middlewares/authorise.midlleware.js'
import { applyCompany, getAllApplication, getApplication, updateApplication } from '../controllers/application.controller.js'
import { validate } from '../middlewares/validate.middleware.js'
import { updateStatusSchema } from '../validator/application.validator.js'
const router = express.Router()

router.post('/apply/:companyId' ,isLoggedIn , authorise("student") ,applyCompany)
router.get('/my' ,isLoggedIn , authorise("student") ,getApplication )
router.get('/company/:companyId' ,isLoggedIn , authorise("admin") ,getAllApplication )
router.patch('/:applicationId/status' ,validate(updateStatusSchema),isLoggedIn , authorise("admin") ,updateApplication )

export default router
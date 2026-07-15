import express from 'express'
import { isLoggedIn } from '../middlewares/protect.middleware.js'
import authorise from '../middlewares/authorise.midlleware.js'
import { createCompany , deleteCompany, getAllCompany, updateCompany } from '../controllers/company.controller.js'
import { validate } from '../middlewares/validate.middleware.js'
import { companySchema } from '../validator/company.validator.js'
const router = express.Router()
router.post('/',validate(companySchema),isLoggedIn , authorise("admin"),createCompany)
router.get('/', isLoggedIn , getAllCompany )
router.get('/', isLoggedIn , getAllCompany )
router.get('/:id' , isLoggedIn , getCompanyById)
router.patch('/:id' ,validate(companySchema), isLoggedIn , authorise("admin") , updateCompany)
router.patch('/:id' , isLoggedIn , authorise("admin") , deleteCompany)

export default router
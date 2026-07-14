import express from 'express'
import { isLoggedIn } from '../middlewares/protect.middleware.js'
import authorise from '../middlewares/authorise.midlleware.js'
import { createCompany , deleteCompany, getAllCompany, updateCompany } from '../controllers/company.controller.js'
const router = express.Router()
router.post('/',isLoggedIn , authorise("admin"),createCompany)
router.get('/', isLoggedIn , getAllCompany )
router.get('/', isLoggedIn , getAllCompany )
router.get('/:id' , isLoggedIn , getCompanyById)
router.patch('/:id' , isLoggedIn , authorise("admin") , updateCompany)
router.patch('/:id' , isLoggedIn , authorise("admin") , deleteCompany)

export default router
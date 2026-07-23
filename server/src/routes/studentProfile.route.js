import express from 'express'
import {  getProfile, updateProfile } from '../controllers/studentProfile.controller.js'
import { isLoggedIn } from '../middlewares/protect.middleware.js'
import authorise from '../middlewares/authorise.midlleware.js'
import { validate } from '../middlewares/validate.middleware.js'
import { studentSchema,updateStudentSchema } from '../validator/student.validator.js'

const router = express.Router()

router.get('/profile', isLoggedIn , authorise('student') , getProfile)
router.patch('/profile',  validate(updateStudentSchema), isLoggedIn , authorise('student') ,updateProfile)

export default router
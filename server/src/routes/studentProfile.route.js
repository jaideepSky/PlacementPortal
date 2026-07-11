import express from 'express'
import {  getProfile, updateProfile } from '../controllers/studentProfile.controller.js'
import { isLoggedIn } from '../middlewares/protect.middleware.js'
import authorise from '../middlewares/authorise.midlleware.js'

const router = express.Router()

router.get('/profile', isLoggedIn , authorise('student') , getProfile)
router.put('/profile',updateProfile)

export default router
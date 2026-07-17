import express from 'express'
import { isLoggedIn } from '../middlewares/protect.middleware.js'
import authorise from '../middlewares/authorise.midlleware.js'
import { uploadResume } from '../controllers/uploadResume.controller.js'
import { upload } from '../middlewares/multer.middleware.js'
const router = express.Router()
router.patch('/upload-resume',isLoggedIn,authorise("student"), upload.single("resume"),uploadResume)

export default router
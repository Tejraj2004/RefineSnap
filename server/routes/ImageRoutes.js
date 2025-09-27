import express from 'express'
import {removeBgImage} from '../controllers/ImageController.js'
import upload from '../middlewares/multer.js'
import authUser from '../middlewares/auth.js'

//Create a route
const ImageRouter = express.Router()

ImageRouter.post('/remove-bg',upload.single('image'),authUser,removeBgImage)

export default ImageRouter

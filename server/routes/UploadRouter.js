import express from 'express'
import { UploadController, RoomController, UserController } from '../controllers/index.js'
import { auth } from "../middlewares/auth.js"
import { uploadimage } from '../middlewares/uploadimage.js'

const router = express.Router()

router.post('/upload_avatar_room/:folder/:id', uploadimage, auth, UploadController.uploadImage, RoomController.updatedAvatarRoom)
router.post('/upload_avatar_user', uploadimage, auth, UploadController.uploadAvatar, UserController.updatedAvatarUser)

export default router
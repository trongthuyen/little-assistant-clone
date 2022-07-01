import express from 'express'
import { UploadController, RoomController } from '../controllers/index.js'
import { auth, verifyAdminChatRoom } from "../middlewares/auth.js"
import { uploadimage } from '../middlewares/uploadimage.js'

const router = express.Router()

// create room chat
// post
router.post('/create', auth, RoomController.create)

// update room chat
// post
router.post('/update/:id', auth, RoomController.update)

// add user
// post
router.post('/add_user/:room', auth, verifyAdminChatRoom, RoomController.addUser)

// remove user
// post
router.post('/remove_user/:room', auth, verifyAdminChatRoom, RoomController.removeUser)

// remove room
// get
router.get('/remove_room/:room', auth, verifyAdminChatRoom, RoomController.removeRoom)

// get single room
// get
router.get('/get_single_room/', auth, RoomController.getSingleRoom)

// get single room data
// get
router.get('/get_single_room/:room', auth, RoomController.getSingleRoomData)

export default router
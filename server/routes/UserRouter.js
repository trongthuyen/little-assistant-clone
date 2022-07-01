import express from "express"
import { UserController } from '../controllers/index.js'
import { auth, verifyAdmin } from "../middlewares/auth.js"

const router = express.Router()

// register
// post
router.post('/register', UserController.register)

// activate
// post
router.post('/activate_email', UserController.activate)

// login
// post
router.post('/login', UserController.login)

// logout
// get
router.get('/logout', auth, UserController.logout)

// get user(s) infomation
// get
router.get('/info', auth, UserController.getUser)
router.get('/all_users', auth, verifyAdmin, UserController.getAllUsers)

// updated user
// post
router.post('/update', auth, UserController.updateUser)
router.post('/update_password', auth, UserController.updatePasswordUser)
router.post('/update_role', auth, verifyAdmin, UserController.updateRoleUser)
router.post('/update_avatar', auth, UserController.updatedAvatarUser)

// reset password
// post
router.post('/forgot_password', UserController.forgotPassword)
router.post('/reset_password', UserController.resetPassword)

// render
router.get('/', UserController.render)

export default router
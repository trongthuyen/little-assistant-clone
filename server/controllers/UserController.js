import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { validateEmail, validatePassword } from '../utils/validateInput.js';
import { UserModel } from '../models/UserModel.js';
import { createAccessToken, createActivationToken } from '../utils/createToken.js'
import { sendMail } from '../mailers/index.js'
import { activateEmail } from '../utils/contentEmail.js';

dotenv.config()

const {
    CLIENT_URL,
    ACTIVATION_TOKEN_SECRET,
    ACCESS_TOKEN_SECRET,
    COOKIE_KEY
} = process.env

export const render = (req, res) => {
    res.send('user page')
    console.log(req.params.id)
}

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body
        
        if(!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please fill all fields'
            })
        } else if(!validateEmail(email)) {
            return res.status(400).json({
                success: false,
                message: 'Email invalid'
            })
        } else if(!validatePassword(password)) {
            return res.status(400).json({
                success: false,
                message: 'Password must be at least 6 characters'
            })
        }
        
        const user = await UserModel.findOne({email})
        if(user) {
            return res.status(400).json({
                success: false,
                message: 'Email existed'
            })
        }
        const hashedPassword = await bcrypt.hash(password, 12)
        const newUser = {
            name: name,
            email, email,
            password: hashedPassword
        }

        const activationToken = createActivationToken(newUser)
        const url = `${CLIENT_URL}/user/activate/${activationToken}`
        const subject = 'Kích hoạt tài khoản Little Assistant'
        const htmlContent = activateEmail({
            text: 'Bạn vừa đăng ý tài khoản thành công, nhấn vào đường link bên dưới trước 5 phút để kích hoạt tài khoản này ^^',
            url
        })
        sendMail(email, subject, htmlContent)
        return res.json({
            success: true,
            message: "Register successfully! Please check your email to start.",
            activationToken
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error'
        })
    }
}

export const activate = async (req, res) => {
    try {
        const { activationToken } = req.body
        const { name, email, password } = jwt.verify(activationToken, ACTIVATION_TOKEN_SECRET)
        const check = await UserModel.findOne({email})
        if(check) {
            return res.status(400).json({
                success: false,
                message: 'Email existed'
            })
        }
        
        let newUser
        const admin = await UserModel.findOne({role: 1})
        if(!admin) {
            newUser = new UserModel({
                name, email, password, role: 1
            })
        } else {
            newUser = new UserModel({
                name, email, password
            })
        }
        
        await newUser.save()
        return res.json({
            success: true,
            message: 'Activating successfully! You can login now.'
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error'
        })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        if(!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please fill all fields'
            })
        } else if(!validateEmail(email)) {
            return res.status(400).json({
                success: false,
                message: 'Email invalid'
            })
        }

        const user = await UserModel.findOne({email})
        if(!user) {
            return res.status(404).json({
                success: false,
                message: "Not found email"
            })
        }
        const isMatchPassword = await bcrypt.compare(password, user.password)
        if(!isMatchPassword) {
            return res.status(400).json({
                success: false,
                message: "Password invald"
            })
        }

        const accessToken = createAccessToken({id: user._id})
        res.cookie(COOKIE_KEY, accessToken, {maxAge: 7*24*60*60*1000})   // 7 days
        return res.json({
            success: true,
            message: "Logged in",
            accessToken
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error'
        })
    }
}

export const logout = async (req, res) => {
    try {
        if(req.token) {
            res.clearCookie(COOKIE_KEY)
            return res.json({
                success: true,
                message: "Logged out"
            })
        }
        
        return res.status(400).json({
            success: false,
            message: "Please login now"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error'
        })
    }
}

export const updateUser = async (req, res) => {
    try {
        const userId = req.user.id
        const { name, email, birthday } = req.body

        if(!validateEmail(email)) {
            return res.status(400).json({
                success: false,
                message: 'Email invalid'
            })
        }
        const user = await UserModel.findById(userId)
        const updatedUser = {
            name: name? name : user.name,
            email: email? email : user.email,
            birthday: birthday? birthday : user.birthday,
            updatedAt: new Date()
        }

        await UserModel.findByIdAndUpdate(userId, updatedUser)
        return res.json({
            success: true,
            message: "Updated successfully",
            updatedUser
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error'
        })
    }
}

export const updatePasswordUser = async (req, res) => {
    try {
        const userId = req.user.id
        const { password } = req.body

        if(!validatePassword(password)) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters"
            })
        }
        const user = await UserModel.findById(userId)
        const updatedUser = {
            password: password? password : user.password
        }
        await UserModel.findByIdAndUpdate(userId, updatedUser)
        return res.json({
            success: true,
            message: "Updated password successfully",
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error'
        })
    }
}

export const updateRoleUser = async (req, res) => {
    try {
        const userId = req.user._id
        const { role, email } = req.body
        const user = await UserModel.find({role : 1})
        if(role === 0 && user.length <= 1) {
            return res.status(400).json({
                success: false,
                message: "Number of admin role must be at least 1 user"
            })
        }
        await UserModel.findOneAndUpdate({email: email}, {role: role})
        return res.json({
            success: true,
            message: "Updated role successfully",
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error'
        })
    }
}

export const updatedAvatarUser = async (req, res) => {
    try {
        await UserModel.findOneAndUpdate({_id: req.user.id}, {avatar: req.avatar})
        return res.json({
            success: true,
            message: "Uploaded avatar"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error'
        })
    }
}

export const getUser = async (req, res) => {
    try {
        const userId = req.user.id
        if(userId) {
            const user = await UserModel.findById(userId).select("-password")
            return res.json({
                success: true,
                message: "Got user information",
                user
            })
        }
        return res.status(400).json({
            success: false,
            message: "Please login now"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error'
        })
    }
}

export const getAllUsers = async (req, res) => {
    try {
        const userList = await UserModel.find().select("-password")
        return res.json({
            success: true,
            message: "Got All users information",
            userList
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error'
        })
    }
}

export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body
        if(!email || !validateEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Please fill your email address"
            })
        }
        
        const user = await UserModel.findOne({email})
        if(!user) {
            return res.status(400).json({
                success: false,
                message: "Email didn't exist"
            })
        }

        return res.json({
            success: true,
            message: "Enter your change",
            email
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error'
        })
    }
}

export const resetPassword = async (req, res) => {
    try {
        const { email, password } = req.body
        console.log(password)
        if(!password || !validatePassword(password)) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters"
            })
        }
        
        const hashedPassword = await bcrypt.hash(password, 12)
        console.log(hashedPassword)
        await UserModel.findOneAndUpdate({email: email}, {password: hashedPassword})

        return res.json({
            success: true,
            message: "Password was changed"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error'
        })
    }
}
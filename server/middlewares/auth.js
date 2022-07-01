import jwt from 'jsonwebtoken'
import { UserModel } from '../models/UserModel.js'
import { RoomUserModel } from '../models/RoomUserModel.js'
import dotenv from 'dotenv'

dotenv.config()
const {
    COOKIE_KEY,
    ACCESS_TOKEN_SECRET
} = process.env

export const auth = (req, res, next) => {
    try {
        const authHeader = req.header('Authorization')
        const token = authHeader && authHeader.split(' ')[1]
        if(!token) {
            return res
                .status(401)
                .json({ success: false, message: "Access token not found" })
        }
        jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
            if(err) return res.status(400).json({
                success: false,
                message: "Token expired"
            })
            req.user = user
            req.token = token
            next()
        })
    } catch (error) {
        console.log(error)
        return res
        .status(403)
        .json({ success: false, message: "Invalid token" })
    }
}
export const verifyAdmin = async (req, res, next) => {
    const authHeader = req.header('Authorization')
    const token = authHeader && authHeader.split(' ')[1]
    if(!token) {
        return res
            .status(401)
            .json({ success: false, message: "Access token not found" })
    }
    try {
        const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)        
        if(!decode) return res.status(400).json({
            success: false,
            message: "Token expired"
        })

        const user = await UserModel.findById(decode.id).select("-password")
        if(user.role !== 1)
        return res.status(401).json({
            success: false,
            message: "You are not Admin"
        })
        req.user = user
        next()
    } catch (error) {
        console.log(error)
        return res
        .status(403)
        .json({ success: false, message: "Invalid token" })
    }
}

export const verifyAdminChatRoom = async (req, res, next) => {
    const authHeader = req.header('Authorization')
    const token = authHeader && authHeader.split(' ')[1]
    if(!token) {
        return res
            .status(401)
            .json({ success: false, message: "Access token not found" })
    }
    try {
        const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)        
        if(!decode) return res.status(400).json({
            success: false,
            message: "Token expired"
        })

        const user = await RoomUserModel.findOne({user: decode.id, room: req.params.room})
        if(!user.role)
        return res.status(401).json({
            success: false,
            message: "You are not Admin chat room"
        })
        req.user = user
        next()
    } catch (error) {
        return res.status(403).json({
            success: false,
            message: "Invalid token"
        })
    }
}
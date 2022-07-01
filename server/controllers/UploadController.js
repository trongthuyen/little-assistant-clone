import dotenv from 'dotenv'
import cloudinary from 'cloudinary'
import { removeTmp } from '../utils/upload.js'

dotenv.config()
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

export const uploadAvatar = (req, res, next) => {
    try {
        const file = req.files.file
        cloudinary.v2.uploader.upload(file.tempFilePath, {
            folder: `${req.user.id}/avatar`,
            width: 1024,
            height: 1024,
            crop: "fill"
        }, async(err, result) => {
            if(err) throw err

            removeTmp(file.tempFilePath)

            req.avatar = result.secure_url
            next()

            // return res.json({
            //     success: true,
            //     message: "Upload file successfully",
            //     url: result.secure_url
            // })
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
}

export const uploadImage = (req, res, next) => {
    try {
        const file = req.files.file
        const folder = req.params.folder
        cloudinary.v2.uploader.upload(file.tempFilePath, {
            folder: `${req.user.id}/${folder}`,
            width: 1024,
            height: 1024,
            crop: "fill"
        }, async(err, result) => {
            if(err) throw err

            removeTmp(file.tempFilePath)
            req.avatar = result.secure_url
            next()

            // return res.json({
            //     success: true,
            //     message: "Upload file successfully",
            //     url: result.secure_url
            // })
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
}
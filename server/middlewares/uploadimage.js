import fs from 'fs'
import { removeTmp } from '../utils/upload.js'

export const uploadimage = async (req, res, next) => {
    try {
        if(!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({
                success: false,
                message: "No file were uploaded"
            })
        }
        
        const file = req.files.file
        if(file.size > 8*1024*1024) {
            removeTmp(file.tempFilePath)
            return res.status(400).json({
                success: false,
                message: "Size too large"
            })
        }
        else if(file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
            removeTmp(file.tempFilePath)
            return res.status(400).json({
                success: false,
                message: "This file is not supported"
            })
        }

        next()
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
}

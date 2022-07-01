import dotenv from 'dotenv'
import { RoomModel } from '../models/RoomModel.js'
import { RoomUserModel } from '../models/RoomUserModel.js'
import { MessageModel } from '../models/MessageModel.js'
import { FileModel } from '../models/FileModel.js'
import { UserModel } from '../models/UserModel.js'
import mongoose from 'mongoose'

dotenv.config()

// room controller
export const create = async (req, res) => {
    try {
        const { user2, name, description } = req.body
        
        if(user2) {
            const room = await RoomModel.findOne({
                $or: [
                    {$and: [{user1: `${req.user.id}`}, {user2: `${user2}`}]},
                    {$and: [{user1: `${user2}`}, {user2: `${req.user.id}`}]},
                ]
            })
    
            console.log(room)
            if(room) {
                return res.status(400).json({
                    success: false,
                    message: "Room existed",
                    room
                })
            }
        }

        const newRoom = new RoomModel({
            name,
            description,
            user1: user2 ? req.user.id : undefined,
            user2: user2
        })
        await newRoom.save()

        if(!user2) {
            const newRoomUser = new RoomUserModel({
                user: req.user.id,
                room: newRoom._id,
                role: true,
            })
            await newRoomUser.save()
        }

        return res.json({
            success: true,
            message: 'Created new room',
            room: newRoom
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
}

export const update = async (req, res) => {
    try {
        const { name, description } = req.body
        let updatedRoom
        if(!name) {
            return res.status(400).json({
                success: false,
                message: "Name couldn't empty"
            })
        } else if(!description) {
            updatedRoom = {name, updatedAt: new Date()}
        } else {
            updatedRoom = {name, description, updatedAt: new Date()}
        }

        await RoomModel.findOneAndUpdate({_id: req.params.id}, updatedRoom)

        return res.json({
            success: true,
            message: "Updated room"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
}

export const updatedAvatarRoom = async (req, res) => {
    try {
        await RoomModel.findOneAndUpdate({_id: req.params.id}, {avatar: req.avatar})
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

export const updateAdmin = async (req, res) => {
    try {
        // chưa hoàn thành
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error'
        })
    }
}

export const updateBlock = async (req, res) => {
    try {
        // chưa hoàn thành
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error'
        })
    }
}

export const addUser = async (req, res) => {
    try {
        const roomId = req.params.room
        const room = await RoomModel.findById(roomId)
        if(!room) return res.status(400).json({
            success: false,
            message: "This room doesn't exist"
        })
        const { user } = req.body
        let u = await UserModel.findById(user)
        if(!u) return res.status(400).json({
            success: false,
            message: "This user does not exist"
        })
        u = await RoomUserModel.findOne({user: user, room: roomId})
        if(u) return res.status(400).json({
            success: false,
            message: "This user existed in this room"
        })
        console.log(user)

        const addedUser = new RoomUserModel({
            user: user,
            room: roomId
        })
        await addedUser.save()

        return res.json({
            success: true,
            message: 'Done',
            user: addedUser
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error'
        })
    }
}

export const removeUser = async (req, res) => {
    try {
        const roomId = req.params.room
        const {user} = req.body
        await RoomUserModel.findOneAndDelete({$and: [{user: user}, {room: roomId}]})
        return res.json({
            success: true,
            message: "Removed this user",
            user: user
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error'
        })
    }
}

export const removeRoom = async (req, res) => {
    try {
        const roomId = req.params.room
        await RoomUserModel.remove({room: roomId})
        await RoomModel.findOneAndDelete({_id: roomId})
        return res.json({
            success: true,
            message: "Removed this user",
            room: roomId
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error'
        })
    }
}

export const getSingleRoom = async (req, res) => {
    try {
        const {user2} = req.body
        const room = await RoomModel.findOne({
            $or: [
                {$and: [{user1: `${req.user.id}`}, {user2: `${user2}`}]},
                {$and: [{user1: `${user2}`}, {user2: `${req.user.id}`}]},
            ]
        })
        if(!room) return res.status(404).json({
            success: false,
            message: "Not found room"
        })
        
        return res.status(404).json({
            success: true,
            message: "Got room info",
            room
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error'
        })
    }
}

export const getSingleRoomData = async (req, res) => {
    try {
        const roomId = req.params.room
        const {user2} = req.body
        const room = await RoomModel.findOne({_id: roomId})
        if(!room) return res.status(404).json({
            success: false,
            message: "Not found room"
        })
        
        return res.status(404).json({
            success: true,
            message: "Got room",
            room
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error'
        })
    }
}


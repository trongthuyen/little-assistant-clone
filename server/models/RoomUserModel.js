import mongoose from "mongoose"

const schema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'rooms'
    },
    nickname: {
        type: String,
        trim: true
    },
    role: {
        type: Boolean,
        default: false  // false = member, true = admin
    },
    block: {
        type: Boolean,
        default: false  // false = unlock, true = lock, only admin can chat
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    updatedAt: {
        type: Date,
        default: new Date()
    }
})

export const RoomUserModel = mongoose.model('roomusers', schema)
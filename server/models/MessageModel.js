import mongoose from "mongoose"

const schema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: Boolean,
        default: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'rooms'
    },
    message: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'messages',
        default: null
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

export const MessageModel = mongoose.model('messages', schema)
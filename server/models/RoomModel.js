import mongoose from "mongoose"

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        default: 'Noname',
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    avatar: {
        type: String,
        trim: true
    },
    user1: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        default: null
    },
    nicknameUser1: {
        type: String,
        trim: true
    },
    user2: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        default: null
    },
    nicknameUser2: {
        type: String,
        trim: true
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

export const RoomModel = mongoose.model('rooms', schema)
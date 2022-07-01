import mongoose from "mongoose"

const schema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
        trim: true
    },
    belongTo: {
        type: String,   // id of user, post, message or comment
        required: true,
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

export const FileModel = mongoose.model('files', schema)
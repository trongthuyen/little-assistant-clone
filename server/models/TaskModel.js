import mongoose from "mongoose"

const schema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    typeTask: {
        type: String,
        enum: ['Meeting', 'Deadline', 'Todo', 'Plan'],
        default: 'Deadline',
        trim: true,
        required: true
    },
    date: {
        type: String,
        required: true,
        trim: true,
        default: `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`
    },
    startTimeAt: String,
    endTimeAt: String,
    week: Number,
    place: {
        type: String,
        trim: true
    },
    status: {
        type: Number,
        enum: [-1, 0, 1],    // -1 = chưa đến, 0 = đang thực hiện, 1 = đã thực hiện
        default: -1
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    updatedAt: {
        type: Date,
        default: new Date()
    },
})

export const TaskModel = mongoose.model('tasks', schema)
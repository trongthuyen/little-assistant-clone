import mongoose from "mongoose"

const schema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please enter your login email"],
        unique: true,
        trim: true
    },
    name: {
        type: String,
        default: 'Admin',
        trim: true
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        trim: true
    },
    role: {
        type: Number,
        default: 0  // 0 = user, 1 = admin
    },
    birthday: {
        type: Date,
        default: Date()
    },
    avatar: {
        type: String,
        default: 'https://scontent.fsgn3-1.fna.fbcdn.net/v/t1.6435-9/70712557_130751768214530_8010231272532082688_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=174925&_nc_ohc=w-S5DHB95mgAX-ACpk1&_nc_ht=scontent.fsgn3-1.fna&oh=00_AT-K2Dc2zNsR-wTXBH-TzrAFY1-g3T3EOMc0AywRXR2kbg&oe=62647FB3'
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

export const UserModel = mongoose.model('users', schema)
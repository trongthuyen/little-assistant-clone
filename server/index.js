import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import fileUpload from 'express-fileupload'
import connect from './db/connect.js'
import routes from './routes/index.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 5000

// connect database
connect()

app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(fileUpload({
    useTempFiles: true
}))
routes(app)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
import UserRouter from './UserRouter.js'
import UploadRouter from './UploadRouter.js'
import SchedulerRouter from './SchedulerRouter.js'
import RoomRouter from './RoomRouter.js'

function routes(app) {
    app.use('/api/user', UserRouter)
    app.use('/api/upload', UploadRouter)
    app.use('/api/scheduler', SchedulerRouter)
    app.use('/api/room', RoomRouter)
}

export default routes
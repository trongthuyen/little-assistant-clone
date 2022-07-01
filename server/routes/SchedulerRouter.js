import express from 'express'
import { SchedulerController } from '../controllers/index.js'
import { auth, verifyAdmin } from "../middlewares/auth.js"

const router = express.Router()

// create a task
// post
router.post('/create', auth, SchedulerController.create)

// update a task
// post
router.post('/update/:id', auth, SchedulerController.update)
router.post('/update_status/:id', auth, SchedulerController.updateStatus)

// delete a task
// get
router.get('/delete_task/:id', auth, SchedulerController.deleteTask)

// get task
// get
router.get('/task/:id', auth, SchedulerController.getTask)
router.get('/task_list/', auth, SchedulerController.getAllTasks)
router.get('/task_list_with_date/:date', auth, SchedulerController.getTasksWithDate)
router.get('/task_list_with_week/:week', auth, SchedulerController.getTasksWithWeek)
router.get('/task_list_with_status/:status', auth, SchedulerController.getTasksWithStatus)

export default router
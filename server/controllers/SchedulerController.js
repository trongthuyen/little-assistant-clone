import dotenv from 'dotenv'
import { TaskModel } from '../models/TaskModel.js';
import { getWeek, validateDate } from '../utils/validateInput.js';

dotenv.config()

// ENV

// get scheduler
export const getScheduler = (req, res) => {
    res.send('Scheduler')
}

export const create = async (req, res) => {
    try {
        const {description, typeTask, date, startTimeAt, endTimeAt, place} = req.body
        if(!description || !typeTask) {
            return res.status(400).json({
                success: false,
                message: "Please fill all fields required"
            })
        }
        
        const week = getWeek(new Date(date))
        if(week === NaN || week === null || week === undefined) return res.status(400).json({
            success: false,
            message: 'Week invalid'
        })
        const newTask = new TaskModel({
            description: description.toUpperCase(),
            typeTask,
            date,
            startTimeAt,
            endTimeAt,
            week,
            place,
            status: typeTask === 'Deadline' ? 0 : -1,
            user: req.user.id
        })
        await newTask.save()

        return res.status(200).json({
            success: true,
            message: "The task has just added",
            task: newTask
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error'
        })
    }
}

export const update = async (req, res) => {
    try {
        const {typeTask, description, date, startTimeAt, endTimeAt, status, place} = req.body
        await TaskModel.findOneAndUpdate({_id: req.params.id}, {
            typeTask,
            description: description.toUpperCase(),
            date,
            startTimeAt,
            endTimeAt,
            status: parseInt(status),
            place,
            updatedAt: new Date()
        })

        return res.json({
            success: true,
            message: "Updated successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error'
        })
    }
}

export const updateStatus = async (req, res) => {
    try {
        const {status} = req.body
        const task = await TaskModel.findById(req.params.id)
        if(!task) {
            return res.status(404).json({
                success: false,
                message: "This task not found"
            })
        }
        await TaskModel.findOneAndUpdate({_id: req.params.id}, {
            status,
            updatedAt: new Date()
        })
        
        return res.json({
            success: true,
            message: "Updated successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error'
        })
    }
}

export const getTask = async (req, res) => {
    try {
        const task = await TaskModel.findOne({_id: req.params.id})
        if(!task) {
            return res.status(404).json({
                success: false,
                message: "Not found"
            })
        }
        return res.json({
            success: true,
            message: "Got task",
            task
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error'
        })
    }
}

export const getAllTasks = async (req, res) => {
    try {
        const taskList = await TaskModel.find({user: req.user.id})
        return res.json({
            success: true,
            message: "Got all tasks",
            taskList
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error'
        })
    }
}

export const getTasksWithDate = async (req, res) => {
    try {
        const taskList = await TaskModel.find({date: req.params.date, user: req.user.id})
        return res.json({
            success: true,
            message: "Got tasks with date",
            taskList: taskList
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error'
        })
    }
}

export const getTasksWithWeek = async (req, res) => {
    try {
        const taskList = await TaskModel.find({week: req.params.week, user: req.user.id})
        return res.json({
            success: true,
            message: "Got tasks with week",
            taskList: taskList
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error'
        })
    }
}

export const getTasksWithStatus = async (req, res) => {
    try {
        const taskList0 = await TaskModel.find({status: -1, user: req.user.id})
        const taskList1 = await TaskModel.find({status: 0, user: req.user.id})
        return res.json({
            success: true,
            message: "Got tasks with status",
            taskList: [...taskList0, ...taskList1]
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error'
        })
    }
}

export const deleteTask = async (req, res) => {
    try {
        await TaskModel.findOneAndDelete({_id: req.params.id})
        return res.json({
            success: true,
            message: "Deleted this task"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error'
        })
    }
}
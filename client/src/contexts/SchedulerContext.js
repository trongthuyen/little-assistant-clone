import { createContext, useEffect, useReducer } from 'react'
import axios from 'axios'
import { SchedulerReducer } from '../reducers/SchedulerReducer'
import { SERVER_URL, SET_TASK, SET_TASKS, SET_TASKS_DAILY, SET_DATE, SET_TASKS_WEEKLY } from '../constants'
import { getSunday, getWeek } from '../utils/timestamp'


export const SchedulerContext = createContext()

function SchedulerContextProvider({children}) {
    const [schedState, dispatch] = useReducer(SchedulerReducer, {
        date: new Date(),
        sunday: getSunday(new Date()),
        task: null,
        tasks: [],
        tasksDaily: [],
        tasksWeekly: [],
        isLoadingTask: true,
        isLoadingAllTasks: true,
        isLoadingTasksDaily: true,
        isLoadingTasksWeekly: true
    })

    // get a task
    const getTask = async payload => {
        try {
            const res = await axios.get(`${SERVER_URL}/scheduler/task/${payload._id}`)
            if(res.data.success) {
                dispatch({
                    type: SET_TASK,
                    payload: {
                        task: res.data.task,
                        isLoadingTask: false
                    }
                })
            }

            return res.data
        } catch (error) {
            console.log(error)
        }
    }

    const getAllTasks = async () => {
        try {
            const res = await axios.get(`${SERVER_URL}/scheduler/task_list`)
            if(res.data.success) {
                dispatch({
                    type: SET_TASKS,
                    payload: {
                        tasks: res.data.taskList.map(t => t.date),
                        isLoadingAllTasks: false
                    }
                })
            }
            return res.data
        } catch (error) {
            console.log(error)
        }
    }

    const getAllTasksWithDate = async payload => {
        try {
            const res = await axios.get(`${SERVER_URL}/scheduler/task_list_with_date/${payload.date}`)
            if(res.data.success) {
                dispatch({
                    type: SET_TASKS_DAILY,
                    payload: {
                        tasksDaily: res.data.taskList,
                        isLoadingTasksDaily: false
                    }
                })
            }
            return res.data
        } catch (error) {
            console.log(error)
        }
    }

    const getAllTasksWithWeek = async payload => {
        try {
            const res = await axios.get(`${SERVER_URL}/scheduler/task_list_with_week/${payload.week}`)
            if(res.data.success) {
                dispatch({
                    type: SET_TASKS_WEEKLY,
                    payload: {
                        tasksWeekly: res.data.taskList,
                        isLoadingTasksWeekly: false
                    }
                })
            }
            return res.data
        } catch (error) {
            console.log(error)
        }
    }

    const setTask = task => {
        dispatch({
            type: SET_TASK,
            payload: {
                task,
                isLoadingTask: task === null ? true : false
            }
        })
    }

    const setDate = dateString => {
        dispatch({
            type: SET_DATE,
            payload: {
                date: new Date(dateString),
                sunday: getSunday(dateString)
            }
        })
    }

    // create task
    const createTask = async payload => {
        try {
            const res = await axios.post(`${SERVER_URL}/scheduler/create`, payload)
            if(res.data.success) {
                const rd = await getAllTasksWithWeek({week: getWeek(new Date(payload.date))})
                if(rd.success) {
                    dispatch({
                        type: SET_TASKS_WEEKLY,
                        payload: {
                            tasksWeekly: rd.taskList,
                            isLoadingTasksWeekly: false
                        }
                    })
                    await getAllTasks()
                }
            }
            return res.data
        } catch (error) {
            console.log(error)
        }
    }

    const updateTask = async payload => {
        try {
            const res = await axios.post(`${SERVER_URL}/scheduler/update/${payload.id}`, payload)
            if(res.data.success) {
                const rd = await getAllTasksWithWeek({week: getWeek(new Date(payload.date))})
                if(rd.success) {
                    dispatch({
                        type: SET_TASKS_WEEKLY,
                        payload: {
                            tasksWeekly: rd.taskList,
                            isLoadingTasksWeekly: false
                        }
                    })
                    await getAllTasks()
                }
            }
            return res.data
        } catch (error) {
            console.log(error)
        }
    }

    const updateStatusTask = async () => {
        try {
            const date = new Date()
            const res = await axios.get(`${SERVER_URL}/scheduler/task_list_with_date/${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`)
            if(res.data.success) {
                res.data.taskList.forEach(async (t) => {
                    const td = t.date.split('-')
                    let payload
                    if(parseInt(td[0]) <= date.getFullYear() && parseInt(td[1]) <= (date.getMonth()+1) && parseInt(td[2]) < date.getDate()) {
                        payload = {status: 1}
                    } else if (parseInt(td[0]) === date.getFullYear() && parseInt(td[1]) === (date.getMonth()+1) && parseInt(td[2]) === date.getDate()) {
                        payload = {status: 0}
                    }
                    await axios.post(`${SERVER_URL}/scheduler/update_status/${t._id}`, payload)
                })
            }
            return res.data
        } catch (error) {
            console.log(error)
        }
    }

    const deleteTask = async payload => {
        try {
            const res = await axios.get(`${SERVER_URL}/scheduler/delete_task/${payload.id}`)
            if(res.data.success) {
                const rd = await getAllTasksWithWeek({week: payload.week})
                if(rd.success) {
                    dispatch({
                        type: SET_TASKS_WEEKLY,
                        payload: {
                            tasksWeekly: rd.taskList,
                            isLoadingTasksWeekly: false
                        }
                    })
                    await getAllTasks()
                }
            }
            return res.data
        } catch (error) {
            console.log(error)
        }
    }

    // setInterval(async () => {
    //     await updateStatusTask()
    // }, 60000)

    useEffect(async () => {
        // await updateStatusTask()
        await getAllTasks()
    }, [])

    const data = {
        schedState,
        createTask,
        updateTask,
        deleteTask,
        setTask,
        getTask,
        getAllTasks,
        getAllTasksWithDate,
        getAllTasksWithWeek,
        setDate
    }
    return (
        <SchedulerContext.Provider value={data}>
            {children}
        </SchedulerContext.Provider>
    )
}

export default SchedulerContextProvider
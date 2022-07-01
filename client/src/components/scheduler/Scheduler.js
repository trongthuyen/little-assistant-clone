import React, { useContext, useEffect, useState } from 'react'
import { SchedulerContext } from '../../contexts/SchedulerContext'
import { getDay, getMonday, getMonth, getNumOfDate, getTuesday, getYear } from '../../utils/timestamp'
import Task from '../task/Task'
import TaskForm from '../task/TaskForm'

function Scheduler() {
    const {
        schedState: {date, sunday, task, tasks, tasksWeekly, isLoadingTask, isLoadingAllTasks, isLoadingTasksWeekly},
        setDate,
        setTask,
        getAllTasks
    } = useContext(SchedulerContext)
    const [days, setDays] = useState([
        'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
    ])

    const handleSetDate = dateString => {
        console.log(dateString)
        setDate(dateString)
        setTask(null)
    }

    const handleDragOver = e => {
        e.preventDefault()

        console.log(e.dataTransfer.getData('taskData'))
    }

    const compareDate = (day, tdate) => {
        const cd = getDay(day, date.toString())
        if(cd.getDate() === tdate.getDate() && cd.getMonth() === tdate.getMonth() && cd.getFullYear() === tdate.getFullYear())
            return true
        return false
    }

    // tasks
    useEffect(async () => await getAllTasks(), [])

    return (
        <>
            <div className='scheduler' id='scheduler'>
                {days.map((d, index) => (<div key={`${d}${index}`} className='scheduler__item'>
                    <div onDrop={e => handleDragOver(e)} onDragOver={e => e.preventDefault()} className={`scheduler__header ${!compareDate(d, date)? '' : 'active'}`} onClick={() => handleSetDate(getDay(d, date))}>
                        <h3 className='scheduler__title'>{d}</h3>
                        <span>
                            {getDay(d, date.toString()).getDate()}/{getDay(d, date.toString()).getMonth() + 1}
                            {/* {(sunday.getDate() + index) % (((sunday.getDate() + index) === getNumOfDate(sunday.getMonth() + 1, getYear(sunday.getFullYear()).isLeap)) ? 32 : getNumOfDate(sunday.getMonth() + 1, getYear(sunday.getFullYear()).isLeap))}
                            /
                            {(index - (sunday.getDate() + index) % (((sunday.getDate() + index) === getNumOfDate(sunday.getMonth() + 1, getYear(sunday.getFullYear()).isLeap)) ? 32 : getNumOfDate(sunday.getMonth() + 1, getYear(sunday.getFullYear()).isLeap))) < 0 ?
                            sunday.getMonth() + 1 :
                            ((sunday.getMonth() + 2) > 12) ? 1 : (sunday.getMonth() + 2)
                            } */}
                        </span>
                    </div>

                    <div className='scheduler__body'>
                        {tasksWeekly.map(task => !compareDate(d, new Date(task.date)) ? '' : (
                            <Task key={task._id} task={task}/>
                        ))}
                    </div>
                </div>))}
            </div>
        </>
    )
}

export default Scheduler

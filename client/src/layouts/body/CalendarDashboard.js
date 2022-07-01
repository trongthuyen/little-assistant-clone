import React from 'react'
import Calendar from '../../components/calendar/Calendar'
import Scheduler from '../../components/scheduler/Scheduler'
import TaskForm from '../../components/task/TaskForm'

function CalendarDashboard() {
    return (
        <div className='window__calender' id='calendardashboard'>
            <div className='window__calendar--item'>
                <Scheduler/>
            </div>
            <div className='window__calendar--item'>
                <Calendar/>
                <TaskForm/>
            </div>
        </div>
    )
}

export default CalendarDashboard

import React, { useContext, useEffect, useState } from 'react'
import { SchedulerContext } from '../../contexts/SchedulerContext'
import { isLink } from '../../utils/validateInput'
import pushpins from '../../assets/img/pushpins.png'

function Task({task}) {
    const {
        deleteTask,
        setTask,
        setDate,
    } = useContext(SchedulerContext)

    // const compareDate = (date) => {
    //     const cd = new Date()
    //     if(cd.getDate() <= date.getDate() && cd.getMonth() <= date.getMonth() && cd.getFullYear() <= date.getFullYear())
    //         return true
    //     return false
    // }

    const handleClickTask = task => {
        setDate(task.date)
        setTask(task)
        console.log(task)
    }

    const handleDeleteTask = async (e, id) => {
        e.stopPropagation()
        try {
            let cfAction = window.confirm('Are you sure about that?')
            if(!cfAction) return
            const rd = await deleteTask({id, week: task.week})
        } catch (error) {
            console.log(error)
        }
    }

    const handleDrag = e => {
        e.dataTransfer.setData('taskData', e.target.innerHTML)
    }

    // let deleteBtn = (
    //     <i
    //         className='bx bx-trash-alt btn-delete-icon'
    //         onClick={async(e) => await handleDeleteTask(e, task._id)}
    //     ></i>
    // )

    let linkTag = (<a target='_blank' href={task.place} onClick={e => e.stopPropagation()}>Click here!</a>)
    let pp = (<img title='Delete task' src={pushpins} className='pushpin' onClick={async(e) => await handleDeleteTask(e, task._id)}/>)

    let body = (<div draggable='true' onDragStart={e => handleDrag(e)} title='Click to edit' onClick={() => handleClickTask(task)} id={`${task.date}${task._id}`} className={`task ${task.status === 1 ? 'done' : task.status === -1 ? 'coming' : 'processing'}`}>
        {pp}
        <p>{task.typeTask}</p>
        <h4 title={task.description}>{task.description}</h4>
        {task.startTimeAt ? <p>From: {task.startTimeAt}</p> : ''}
        {task.endTimeAt ? <p>To: {task.endTimeAt}</p> : ''}
        {task.place ? <p>Place: {isLink(task.place) ? linkTag : task.place}</p> : ''}
        {/* {deleteBtn} */}
    </div>)

    useEffect(() => {
        // deleteBtn = (
        //     <i
        //         className='bx bx-trash-alt btn-delete-icon'
        //         onClick={async(e) => await handleDeleteTask(e, task._id)}
        //     ></i>
        // )
        pp = (<img title='Delete task' src={pushpins} className='pushpin' onClick={async(e) => await handleDeleteTask(e, task._id)}/>)
        body = (<div onClick={() => handleClickTask(task)} className={`task ${task.status === 1 ? 'done' : task.status === -1 ? 'coming' : 'processing'}`}>
            <p>{task.typeTask}</p>
            <h4>{task.description}</h4>
            <p>From: {task.startTimeAt} {task.date}</p>
            <p>To: {task.endTimeAt} {task.endDateAt}</p>
            <p>Place: {task.place}</p>
            {/* {deleteBtn} */}
        </div>)
    }, [task])

    return (<>
        {body}
    </>)
}

export default Task

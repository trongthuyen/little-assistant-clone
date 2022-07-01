import React, { useContext, useEffect, useState } from 'react'
import { SchedulerContext } from '../../contexts/SchedulerContext'

function TaskForm() {
    const {
        schedState: {date, task, isLoadingTask},
        createTask,
        updateTask,
        setTask,
    } = useContext(SchedulerContext)
    
    const [dataForm, setDataForm] = useState({
        typeTask: !isLoadingTask ? task.typeTask : 'Deadline',
        description: !isLoadingTask ? task.description : '',
        date: !isLoadingTask ? task.date : `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`,
        startTimeAt: !isLoadingTask ? task.startTimeAt : '',
        endTimeAt: !isLoadingTask ? task.endTimeAt : '',
        place: !isLoadingTask ? task.place : '',
        status: !isLoadingTask ? task.status : -1
    })

    const compareDate = (date) => {
        const cd = new Date()
        if(cd.getDate() <= date.getDate() && cd.getMonth() <= date.getMonth() && cd.getFullYear() <= date.getFullYear())
            return true
        return false
    }

    const handleChangeInput = e => {
        setDataForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmitForm = async e => {
        e.preventDefault()

        try {
            if(!dataForm.date || !dataForm.description || !dataForm.typeTask) {
                console.log('Please fill all fields required')
                return
            }

            let rd
            if(!isLoadingTask) {
                rd = await updateTask({...dataForm, id: task._id})
            } else {
                // if (!compareDate(new Date(dataForm.date))) {
                //     console.log('Date must be greater than or equal today')
                //     return
                // }
                rd = await createTask(dataForm)
            }
            if(rd.success) {
                if(task) {
                    setTask(null)
                }
                resetForm()
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => setDataForm(prev => ({
        ...prev,
        typeTask: !isLoadingTask ? task.typeTask : 'Deadline',
        description: !isLoadingTask ? task.description : '',
        date: !isLoadingTask ? task.date : `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`,
        startTimeAt: !isLoadingTask ? task.startTimeAt : '',
        endTimeAt: !isLoadingTask ? task.endTimeAt : '',
        place: !isLoadingTask ? task.place : '',
        status: !isLoadingTask ? task.status : -1,
    })), [date, task, isLoadingTask])

    useEffect(() => setDataForm(prev => ({
        ...prev,
        date: `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`,
    })), [date])

    const resetForm = () => {
        setDataForm(prev => ({
            ...prev,
            description: '',
            date: `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`,
            startTimeAt: '',
            endTimeAt: '',
            place: ''
        }))
    }

    return !date ? '' : (
        <form id='taskForm' className='task__form' onSubmit={async e => await handleSubmitForm(e)}>
            <h3>Schedule for {date.getDate()}/{date.getMonth() + 1}</h3>
            {(isLoadingTask || true) && <div className='task__form--group radio'>
                <label htmlFor='deadline' className={`label-radio ${dataForm.typeTask === 'Deadline' ? 'active' : ''}`}>
                    <input
                        type='radio'
                        id='deadline'
                        name='typeTask'
                        className='task__form--input radio'
                        value='Deadline'
                        onChange={e => handleChangeInput(e)}
                    />
                    Deadline
                </label>
                <label htmlFor='meeting' className={`label-radio ${dataForm.typeTask === 'Meeting' ? 'active' : ''}`}>
                    <input
                        type='radio'
                        id='meeting'
                        name='typeTask'
                        className='task__form--input radio'
                        value='Meeting'
                        onChange={e => handleChangeInput(e)}
                    />
                    Meeting
                </label>
                <label htmlFor='plan' className={`label-radio ${dataForm.typeTask === 'Plan' ? 'active' : ''}`}>
                    <input
                        type='radio'
                        id='plan'
                        name='typeTask'
                        className='task__form--input radio'
                        value='Plan'
                        onChange={e => handleChangeInput(e)}
                    />
                    Plan
                </label>
                <label htmlFor='todo' className={`label-radio ${dataForm.typeTask === 'Todo' ? 'active' : ''}`}>
                    <input
                        type='radio'
                        id='todo'
                        name='typeTask'
                        className='task__form--input radio'
                        value='Todo'
                        onChange={e => handleChangeInput(e)}
                    />
                    Todo
                </label>
            </div>}
            {!isLoadingTask && <div className='task__form--group radio'>
                <label htmlFor='coming' className={`label-radio ${parseInt(dataForm.status) === -1 ? 'active' : ''}`}>
                    <input
                        type='radio'
                        id='coming'
                        name='status'
                        className='task__form--input radio'
                        value={-1}
                        onChange={e => handleChangeInput(e)}
                    />
                    Sắp tới
                </label>
                <label htmlFor='processing' className={`label-radio ${parseInt(dataForm.status) === 0 ? 'active' : ''}`}>
                    <input
                        type='radio'
                        id='processing'
                        name='status'
                        className='task__form--input radio'
                        value={0}
                        onChange={e => handleChangeInput(e)}
                    />
                    Đang làm
                </label>
                <label htmlFor='done' className={`label-radio ${parseInt(dataForm.status) === 1 ? 'active' : ''}`}>
                    <input
                        type='radio'
                        id='done'
                        name='status'
                        className='task__form--input radio'
                        value={1}
                        onChange={e => handleChangeInput(e)}
                    />
                    Đã xong
                </label>
            </div>}
            <div className='task__form--group input'>
                <label htmlFor='description'>Description <em>(*)</em></label>
                <input
                    type='text'
                    id='description'
                    name='description'
                    className='task__form--input description'
                    placeholder='Description'
                    value={dataForm.description}
                    required
                    onChange={e => handleChangeInput(e)}
                />
            </div>
            <div className='task__form--group input time'>
                <label htmlFor=''>
                    From:
                    <input
                        type='text'
                        id='startAt'
                        name='startTimeAt'
                        className='task__form--input startAt'
                        placeholder='Hour'
                        value={dataForm.startTimeAt}
                        onChange={e => handleChangeInput(e)}
                    />
                </label>
                <label htmlFor=''>
                    To:
                    <input
                        type='text'
                        id='endAt'
                        name='endTimeAt'
                        className='task__form--input endAt'
                        placeholder='Hour'
                        value={dataForm.endTimeAt}
                        onChange={e => handleChangeInput(e)}
                    />
                    </label>
            </div>
            <div className='task__form--group input'>
                <label htmlFor=''>Place/link <em>("http(s)://...")</em></label>
                <input
                    type='text'
                    id='place'
                    name='place'
                    className='task__form--input place'
                    placeholder='Place/link'
                    value={dataForm.place}
                    onChange={e => handleChangeInput(e)}
                />
            </div>
        
            <button className='btn btn-sched'>{isLoadingTask ? 'Setup' : 'Update'}</button>
        </form>
    )
}

export default TaskForm

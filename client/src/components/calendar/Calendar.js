import React, { useContext, useEffect, useState } from 'react'
import { SchedulerContext } from '../../contexts/SchedulerContext'
import { getDates, getMonth, getSunday, getWeek, getYear } from '../../utils/timestamp'

function Calendar() {
    // initial calendar state
    const [calendar, setCalendar] = useState({
        dates: getDates(getMonth().month, getYear().year),
        month: getMonth(),
        year: getYear()
    })
    const { dates, month, year } = calendar

    const {
        schedState,
        getAllTasks,
        getAllTasksWithDate,
        getAllTasksWithWeek,
        setDate,
        setTask
    } = useContext(SchedulerContext)

    const handleSetCalendar = (isNext) => {
        let m, y
        if(isNext) {
            m = calendar.month.month < 12 ? calendar.month.month + 1 : 1
            y = m !== 1 ? calendar.year.year : calendar.year.year + 1
        } else {
            m = calendar.month.month > 1 ? calendar.month.month - 1 : 12
            y = m !== 12 ? calendar.year.year : calendar.year.year - 1
        }
        setCalendar(prev => ({
            ...prev,
            dates: getDates(m, y),
            month: getMonth(m),
            year: getYear(y)
        }))
    }

    const handleGetSched = async (dd, mm, yyyy) => {
        setDate(`${yyyy}-${mm}-${dd}`)
        setTask(null)
        const rd1 = await getAllTasksWithDate({date: `${yyyy}-${mm}-${dd}`})
        const rd2 = await getAllTasksWithWeek({week: getWeek(new Date(`${yyyy}-${mm}-${dd}`))})
    }

    useEffect(async () => {
        const rd2 = await getAllTasksWithDate({date: `${year.year}-${month.month}-${dates.date}`})
        const rd3 = await getAllTasksWithWeek({week: getWeek(new Date(`${year.year}-${month.month}-${dates.date}`))})
    }, [])

    return (
        <div className='calendar' id='calendar'>
            <div className='calendar__header'>
                {/* icon btn */}
                <i className='bx bx-chevron-left calendar-icon left' onClick={() => handleSetCalendar(false)}></i>
                <i className='bx bx-chevron-right calendar-icon right' onClick={() => handleSetCalendar(true)}></i>
                {/* title */}
                <h4>{dates.today}. {month.eng}. {dates.date} {year.year}</h4>
            </div>
            
            <div className='calendar__body'>
                <div className='calendar__body--day'>
                    {dates.days.map(d => (<span key={`day-${d}`}>{d}</span>))}
                </div>
                <div className='calendar__body--date'>
                    {dates.dates.map((d, index) =>
                    (<span
                        key={`date-${d}${index}`}
                        className={`calendar__body--date--item
                        ${!d ? null: dates.date === d && month.month ===  getMonth().month && year.year === getYear().year ?
                        'active' :
                        schedState.date.getDate() === d ?
                        'ghost' :
                        ''} ${schedState.tasks.includes(`${year.year}-${month.month}-${d}`) ? 'something' : ''}`}
                        onClick={async () => await handleGetSched(d, month.month, year.year)}
                    >
                        {d}
                    </span>)
                )}
                </div>
            </div>
        </div>
    )
}

export default Calendar

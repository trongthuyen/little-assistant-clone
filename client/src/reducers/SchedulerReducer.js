import { SET_TASK, SET_TASKS, SET_TASKS_DAILY, SET_DATE, SET_TASKS_WEEKLY } from "../constants"

export const SchedulerReducer = (state, action) => {
    const {
        type,
        payload: {date, sunday, task, tasks, tasksDaily, tasksWeekly, isLoadingTask, isLoadingAllTasks, isLoadingTasksDaily, isLoadingTasksWeekly}
    } = action

    switch (type) {
        case SET_TASK:
            return {
                ...state,
                task,
                isLoadingTask
            }
        case SET_TASKS:
            return {
                ...state,
                tasks,
                isLoadingAllTasks
            }
        case SET_TASKS_DAILY:
            return {
                ...state,
                tasksDaily,
                isLoadingTasksDaily
            }
        case SET_TASKS_WEEKLY:
            return {
                ...state,
                tasksWeekly,
                isLoadingTasksWeekly
            }
        case SET_DATE:
            return {
                ...state,
                date,
                sunday
            }
        default: return state
    }
}
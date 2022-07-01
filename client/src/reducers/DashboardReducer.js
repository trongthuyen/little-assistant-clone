import { SET_MARGIN_LEFT_CONTAINER } from "../constants"

export const DashboardReducer = (state, action) => {
    const {
        type,
        payload: { marginLeftContainer }
    } = action
    switch (type) {
        case SET_MARGIN_LEFT_CONTAINER: {
            return {
                ...state,
                marginLeftContainer
            }
        }
        default: return state
    }
}
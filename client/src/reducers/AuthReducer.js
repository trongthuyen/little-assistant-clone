import { SET_EMAIL_RESET_PASSWORD, SET_USER } from "../constants"

export const AuthReducer = (state, action) => {
    const {type, payload: {
        user,
        emailResetPassword,
        isLoadingUser,
        isLoadingEmailResetPassword
    }} = action

    switch (type) {
        case SET_USER: {
            return {
                ...state,
                user,
                isLoadingUser
            }
        }
        case SET_EMAIL_RESET_PASSWORD: {
            return {
                ...state,
                emailResetPassword,
                isLoadingEmailResetPassword
            }
        }
        default: return state
    }
}
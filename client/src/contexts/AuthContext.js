import React, { createContext, useEffect, useReducer } from "react"
import axios from 'axios'
import { AuthReducer } from "../reducers/AuthReducer"
import { SERVER_URL, SET_USER, SET_EMAIL_RESET_PASSWORD, LOGIN_LA, ISADMIN, EXPIRED, TRUE, FALSE } from "../constants"
import setAuthToken from "../utils/setAuthToken"
import { getCookie, setCookie, eraseCookie } from "../utils/setCookie"

export const AuthContext = createContext()

const AuthContextProvider = ({children}) => {

    const [authState, dispatch] = useReducer(AuthReducer, {
        user: null,
        users: [],
        emailResetPassword: null,
        isLoadingUser: true,
        isLoadingUsers: true,
        isLoadingEmailResetPassword: true,
    })

    const loadUser = async () => {
        try {
            console.log('...')
            setAuthToken(getCookie(LOGIN_LA))
            const res = await axios.get(`${SERVER_URL}/user/info`)
            if(res.data.success) {
                dispatch({
                    type: SET_USER,
                    payload: {
                        user: res.data.user,
                        isLoadingUser: false
                    }
                })
                if(res.data.user.role === 1) {
                    setCookie(ISADMIN, TRUE, EXPIRED)
                } else {
                    setCookie(ISADMIN, FALSE, EXPIRED)
                }
            } else {
                dispatch({
                    type: SET_USER,
                    payload: {
                        user: null,
                        isLoadingUser: true
                    }
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    const login = async payload => {
        try {
            const res = await axios.post(`${SERVER_URL}/user/login`, payload)
            if(res.data.success) {
                setCookie(LOGIN_LA, res.data.accessToken, EXPIRED)
                await loadUser()
            }
            return res.data
        } catch (error) {
            console.log(error)
        }
    }

    const logout = async () => {
        try {
            const res = await axios.get(`${SERVER_URL}/user/logout`)
            eraseCookie(LOGIN_LA)
            eraseCookie(ISADMIN)
            return res.data
        } catch (error) {
            console.log(error)
        }
    }
    
    const register = async payload => {
        try {
            const res = await axios.post(`${SERVER_URL}/user/register`, payload)
            return res.data
        } catch (error) {
            console.log(error)
        }
    }

    const activate = async payload => {
        try {
            const res = await axios.post(`${SERVER_URL}/user/activate_email`, payload)
            return res.data
        } catch (error) {
            console.log(error)
        }
    }

    const forgotPassword = async payload => {
        try {
            if(!payload?.password) {
                const res = await axios.post(`${SERVER_URL}/user/forgot_password`, payload)
                console.log(res.data)
                if(res.data.success) {
                    dispatch({
                        type: SET_EMAIL_RESET_PASSWORD,
                        payload: {
                            emailResetPassword: res.data.email,
                            isLoadingEmailResetPassword: false
                        }
                    })
                }
                return res.data
            } else {
                const res = await axios.post(`${SERVER_URL}/user/reset_password`, payload)
                dispatch({
                    type: SET_EMAIL_RESET_PASSWORD,
                    payload: {
                        emailResetPassword: null,
                        isLoadingEmailResetPassword: true
                    }
                })
                return res.data
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(async () => await loadUser(), [])

    const data = {
        authState,
        loadUser,
        login,
        logout,
        register,
        activate,
        forgotPassword,
    }

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider
import React from 'react'
import LoginForm from '../../components/auth/LoginForm'
import RegisterForm from '../../components/auth/RegisterForm'

function Login({ element }) {
    return (
        <>
            {element === 'register' ? <RegisterForm/> : <LoginForm/>}
        </>
    )
}

export default Login

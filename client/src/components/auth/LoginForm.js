import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import AlertMessage from '../../utils/alert/AlertMessage'
import { validateEmail, validatePassword } from '../../utils/validateInput'

function LoginForm() {
    const navigate = useNavigate()
    const [alert, setAlert] = useState(null)
    const {
        authState: { user },
        login
    } = useContext(AuthContext)
    const [formState, setFormState] = useState({
        email: '',
        password: ''
    })
    const {email, password} = formState

    const handleChangeInput = event => {
        setFormState(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }))
    }

    const handleClickTag = event => {
        event.target.classList.toggle('active')
    }

    const handleSubmitForm = async (event) => {
        event.preventDefault()
        if(!validateEmail(email) || !validatePassword(password)) {
            setAlert({
                type: 'danger',
                message: 'Email or password invalid'
            })
            setTimeout(() => setAlert(null), 3000)
            return
        }

        const rd = await login(formState)
        if(!rd.success) {
            setAlert({
                type: 'danger',
                message: rd.message
            })
            setTimeout(() => setAlert(null), 3000)
        } else {
            resetForm()
            navigate('/dashboard')
        }
    }

    const resetForm = () => {
        setFormState({
            email: '',
            password: ''
        })
        setTimeout(() => setAlert(null), 3000)
    }

    useEffect(() => console.log(user), [user])

    return (
        <div className='body'>
            <div className='section section__auth'>
                <h1 className='section__bigtitle'>Login</h1>

                <AlertMessage info={alert}/>
                <form className='form__auth' onSubmit={e => handleSubmitForm(e)}>
                    <div className='form__auth--component'>
                        <label htmlFor='email' className='form__auth--tag' onClick={e => handleClickTag(e)}>Email</label>
                        <input
                            type='email'
                            className='form__auth--input active'
                            id='email'
                            name='email'
                            placeholder='Enter your email address'
                            required
                            value={email}
                            onChange={e => handleChangeInput(e)}
                        />
                    </div>
                    <div className='form__auth--component'>
                        <label htmlFor='password' className='form__auth--tag' onClick={e => handleClickTag(e)}>Password</label>
                        <input
                            type='password'
                            className='form__auth--input'
                            id='password'
                            name='password'
                            placeholder='Enter your password'
                            required
                            value={password}
                            onChange={e => handleChangeInput(e)}
                        />
                    </div>
                    <button className='form__auth--btn'>Login</button>
                </form>

                <p className='form__link'>
                    <Link to='/forgot_password'><i className='bx bx-right-arrow-alt'></i> Forgot password</Link>
                    <Link to='/register'><i className='bx bx-right-arrow-alt'></i> Create a new account</Link>
                </p>
            </div>
        </div>
    )
}

export default LoginForm

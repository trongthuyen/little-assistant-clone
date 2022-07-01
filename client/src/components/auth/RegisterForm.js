import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import AlertMessage from '../../utils/alert/AlertMessage'
import { isMatchPassword, validateEmail, validatePassword } from '../../utils/validateInput'

function RegisterForm() {
    const navigate = useNavigate()
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        password: '',
        cfPassword: ''
    })
    const {name, email, password, cfPassword} = formState
    const [alert, setAlert] = useState(null)
    const handleChangeInput = event => {
        setFormState(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }))
    }

    const {
        register
    } = useContext(AuthContext)

    const handleClickTag = event => {
        event.target.classList.toggle('active')
    }

    const handleSubmitForm = async (event) => {
        event.preventDefault()

        if(!validateEmail) {
            setAlert({
                type: 'danger',
                message: 'Email invalid'
            })
            setTimeout(() => setAlert(null), 3000)
        }
        else if(!validatePassword(password)) {
            setAlert({
                type: 'danger',
                message: 'Password must be at least 6 characters'
            })
            setTimeout(() => setAlert(null), 3000)
        }
        else if(!isMatchPassword(password, cfPassword)) {
            setAlert({
                type: 'danger',
                message: 'Password does not match'
            })
            setTimeout(() => setAlert(null), 3000)
        } else {
            const rd = await register(formState)
            console.log(rd)
            if(!rd.success) {
                setAlert({
                    type: 'danger',
                    message: rd.message
                })
                setTimeout(() => setAlert(null), 3000)
            } else {
                resetForm()
                navigate('/login')
            }
        }
    }

    const resetForm = () => {
        setFormState({
            name: '',
            email: '',
            password: '',
            cfPassword: ''
        })
        setTimeout(() => setAlert(null), 3000)
    }

    return (
        <div className='body'>
            <div className='section section__auth'>
                <h2 className='section__bigtitle'>Register</h2>

                <AlertMessage info={alert}/>
                <form className='form__auth' onSubmit={e => handleSubmitForm(e)}>
                    <div className='form__auth--component'>
                        <label htmlFor='name' className='form__auth--tag' onClick={e => handleClickTag(e)}>Name</label>
                        <input
                            type='text'
                            className='form__auth--input'
                            id='name'
                            name='name'
                            placeholder='Enter your name'
                            value={name}
                            onChange={e => handleChangeInput(e)}
                        />
                    </div>
                    <div className='form__auth--component'>
                        <label htmlFor='email' className='form__auth--tag' onClick={e => handleClickTag(e)}>Email</label>
                        <input
                            type='email'
                            className='form__auth--input'
                            id='email'
                            name='email'
                            placeholder='Enter your email address'
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
                            value={password}
                            onChange={e => handleChangeInput(e)}
                        />
                    </div>
                    <div className='form__auth--component'>
                        <label htmlFor='cfPassword' className='form__auth--tag' onClick={e => handleClickTag(e)}>Confirm password</label>
                        <input
                            type='password'
                            className='form__auth--input'
                            id='cfPassword'
                            name='cfPassword'
                            placeholder='Enter confirm password'
                            value={cfPassword}
                            onChange={e => handleChangeInput(e)}
                        />
                    </div>
                    <button className='form__auth--btn'>Register</button>
                </form>
            
                <p className='form__link'>
                    Do you have an account?
                    <Link to='/login'><i className='bx bx-right-arrow-alt'></i> Login</Link>
                </p>
            </div>
        </div>
    )
}

export default RegisterForm

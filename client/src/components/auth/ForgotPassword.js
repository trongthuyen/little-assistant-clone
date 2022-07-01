import React, { useContext, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import AlertMessage from '../../utils/alert/AlertMessage'
import { isMatchPassword, validateEmail, validatePassword } from '../../utils/validateInput'

function ForgotPassword() {
    const navigate = useNavigate()
    const [alert, setAlert] = useState(null)
    const {
        authState: { user, emailResetPassword, isLoadingEmailResetPassword },
        forgotPassword,
    } = useContext(AuthContext)
    const [formState, setFormState] = useState({
        email: '',
        password: '',
        cfPassword: ''
    })
    const {email, password, cfPassword} = formState

    const handleChangeInput = event => {
        setFormState(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }))
    }

    const handleClickTag = event => {
        event.target.classList.toggle('active')
    }

    const handleSubmitForm = async event => {
        event.preventDefault()

        if(!email || !validateEmail(email)) {
            setAlert({
                type: 'danger',
                message: 'Email invalid'
            })
            setTimeout(() => setAlert(null), 3000)
            return
        } else {
            if(isLoadingEmailResetPassword) {
                const rd = await forgotPassword({email})
                if(!rd.success) {
                    setAlert({
                        type: 'danger',
                        message: rd.message
                    })
                    setTimeout(() => setAlert(null), 3000)
                }
            } else {
                if(!validatePassword(password) || !isMatchPassword(password, cfPassword)) {
                    setAlert({
                        type: 'danger',
                        message: 'Password invalid or does not match'
                    })
                    setTimeout(() => setAlert(null), 3000)
                    return
                }
                const rd = await forgotPassword({email: emailResetPassword, password})
                console.log(rd)
                if(rd.success) {
                    navigate('/login')
                }
            }
        }
    }

    return (
        <div className='body'>
            <div className='section section__auth'>
                <h1 className='section__bigtitle'>Forgot Password</h1>

                <AlertMessage info={alert}/>
                <form className='form__auth' onSubmit={e => handleSubmitForm(e)}>
                    {isLoadingEmailResetPassword && (
                    <div className='form__auth--component'>
                        <label htmlFor='email' className='form__auth--tag' onClick={e => handleClickTag(e)}>Enter your email signed up</label>
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
                    )}
                    {!isLoadingEmailResetPassword && (<>
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
                    </>)}
                    <button className='form__auth--btn'>Continue</button>
                </form>

                <p className='form__link'>
                    <Link to='/login'><i className='bx bx-right-arrow-alt'></i> Login</Link>
                    <Link to='/register'><i className='bx bx-right-arrow-alt'></i> Create a new account</Link>
                </p>
            </div>
        </div>
    )
}

export default ForgotPassword

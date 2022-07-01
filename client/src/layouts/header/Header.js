import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/img/logo.png'

function Header({ user }) {
    const [dataForm, setDataForm] = useState({
        search: ''
    })

    const handleChangeDataForm = e => {
        setDataForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }
    return (
        <header id='header' className='header'>
            <div className='header__form'>
                <form>
                    <input
                        type='text'
                        name='search'
                        id='search'
                        placeholder='Search...'
                        value={dataForm.search}
                        onChange={e => handleChangeDataForm(e)}
                    />
                    <button>
                        <i className='bx bx-search'></i>
                    </button>
                </form>
            </div>

            <div className='header__timestamp'>
                <div className='header__timestamp--item'>
                    12:34
                </div>
                <div className='header__timestamp--item'>
                    26-06-2001
                </div>
            </div>

            <div className='header__user'>
                <span className='header__user--item'>
                    <i className='bx bx-message-square' title='message' ></i>
                </span>
                <span className='header__user--item'>
                    <i className='bx bx-bell' title='notice' ></i>
                </span>
                <Link to='../portfolio' className='header__user--item'>
                    {/* {user?.avatar ? (<img src={user.avatar} alt='Admin' />) : (<i className='bx bx-user' ></i>)} */}
                    <img src={user?.avatar? user.avatar : logo} alt='LA'/>
                </Link>
            </div>
        </header>
    )
}

export default Header

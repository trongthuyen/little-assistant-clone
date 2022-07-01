import React, { useState, memo, useRef, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { DashboardContext } from '../../contexts/DashboardContext'
import logo from '../../assets/img/logo.png'
import { AuthContext } from '../../contexts/AuthContext'

const Sidebar = memo(function ({active}) {
    const navigate = useNavigate()
    const sidebarRef = useRef()
    const [showSidebar, setShowSidebar] = useState(true)
    const [showSidebarShort, setShowSidebarShort] = useState(true)
    const {
        logout
    } = useContext(AuthContext)

    const {
        setMarginLeftContainer
    } = useContext(DashboardContext)

    const handleLogout = async () => {
        const rd = await logout()
        console.log(rd)
        if(rd.success) {
            navigate('/login')
        }

    }

    const handleToggleSidebar = e => {
        if(!e) {
            setMarginLeftContainer(!showSidebarShort)
            setShowSidebarShort(!showSidebarShort)
        } else {
            setShowSidebar(true)
        }
    }

    return (
        <div ref={sidebarRef} className={`sidebar ${showSidebarShort? 'short': ''}`}>
            <h2 className='sidebar__title'>
                {/* <i className='bx bxs-dashboard' title='Menu' onClick={() => handleToggleSidebar()}></i> */}
                {!logo? (<i className='bx bxs-dashboard' title='Menu' onClick={() => handleToggleSidebar()}></i>):
                (<img src={logo} alt='L' onClick={() => handleToggleSidebar()}/>)}
                <span onClick={() => handleToggleSidebar()}>Little Assistant</span>
            </h2>

            {showSidebar && (
            <ul className={`sidebar__list ${showSidebarShort? 'short' : ''}`}>
                <li className={`sidebar__list--item ${active?.portfolio}`}>
                    <Link to='/dashboard/portfolio'>
                        <i className='bx bx-user'></i>
                        <span>Portfolio</span>
                    </Link>
                </li>
                <li className={`sidebar__list--item ${active?.warehouse}`}>
                    <Link to='/dashboard/warehouse'>
                        <i className='bx bx-data' ></i>
                        <span>Warehouse</span>
                    </Link>
                </li>
                <li className={`sidebar__list--item ${active?.order}`}>
                    <Link to='/dashboard/order'>
                        <i className='bx bx-cart' ></i>
                        <span>Orders</span>
                    </Link>
                </li>
                <li className={`sidebar__list--item ${active?.customer}`}>
                    <Link to='/dashboard/customer'>
                        <i className='bx bx-id-card' ></i>
                        <span>Customers</span>
                    </Link>
                </li>
                <li className={`sidebar__list--item ${active?.account}`}>
                    <Link to='/dashboard/account'>
                        <i className='bx bxs-user-account' ></i>
                        <span>Accounts</span>
                    </Link>
                </li>
                <li className={`sidebar__list--item ${active?.blog}`}>
                    <Link to='/dashboard/blog'>
                        <i className='bx bx-message-square-edit' ></i>
                        <span>Blogs</span>
                    </Link>
                </li>
                <li className={`sidebar__list--item ${active?.message}`}>
                    <Link to='/dashboard/message'>
                        <i className='bx bx-message-square-dots' ></i>
                        <span>Message</span>
                    </Link>
                </li>
                <li className={`sidebar__list--item ${active?.calendar}`}>
                    <Link to='/dashboard/calendar'>
                        <i className='bx bx-calendar-check' ></i>
                        <span>Calendar</span>
                    </Link>
                </li>
                <li className='sidebar__list--item'>
                    <Link to='#' onClick={() => handleLogout()}>
                        <i className='bx bx-exit' ></i>
                        <span>Logout</span>
                    </Link>
                </li>
            </ul>
            )}
        </div>
    )
})

export default Sidebar

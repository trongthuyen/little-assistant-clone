import React, { useContext, useEffect, useState } from 'react'
import { DashboardContext } from '../../contexts/DashboardContext'
import Body from '../../layouts/body/Body'
import PortfolioDashboard from '../../layouts/body/PortfolioDashboard'
import WarehouseDashboard from '../../layouts/body/WarehouseDashboard'
import OrderDashboard from '../../layouts/body/OrderDashboard'
import CustomerDashboard from '../../layouts/body/CustomerDashboard'
import AccountDashboard from '../../layouts/body/AccountDashboard'
import BlogDashboard from '../../layouts/body/BlogDashboard'
import MessageDashboard from '../../layouts/body/MessageDashboard'
import CalendarDashboard from '../../layouts/body/CalendarDashboard'
import Header from '../../layouts/header/Header'

function Container({ children, user }) {
    const {
        dashboardState: {marginLeftContainer}
    } = useContext(DashboardContext)
    
    const [styledContainer, setStyledContainer] = useState({
        marginLeft: marginLeftContainer,
        width: `calc(100% - ${marginLeftContainer}px)`
    })

    useEffect(() => setStyledContainer({
        marginLeft: marginLeftContainer,
        width: `calc(100% - ${marginLeftContainer}px)`
    }), [marginLeftContainer])

    return (
        <div className='container v1' style={styledContainer}>
            <Header user={user}/>
            {/* <Body/> */}
            {
                children === 'portfolio' ? <PortfolioDashboard/> :
                children === 'warehouse' ? <WarehouseDashboard/> :
                children === 'order' ? <OrderDashboard/> :
                children === 'customer' ? <CustomerDashboard/> :
                children === 'account' ? <AccountDashboard/> :
                children === 'blog' ? <BlogDashboard/> :
                children === 'message' ? <MessageDashboard/> :
                children === 'calendar' ? <CalendarDashboard/> : ''
            }
        </div>
    )
}

export default Container

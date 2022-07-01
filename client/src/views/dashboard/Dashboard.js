import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Container from '../../components/container/Container'
import Sidebar from '../../components/sidebar/Sidebar'
import { ISADMIN } from '../../constants'
import { AuthContext } from '../../contexts/AuthContext'
import { getCookie } from '../../utils/setCookie'

function Dashboard({children}) {
    const navigate = useNavigate()
    const {
        authState: {user},
    } = useContext(AuthContext)

    useEffect(() => {
        if(!getCookie(ISADMIN)) {
            navigate('/login')
        }
    }, [user])

    useEffect(() => console.log(user), [user])

    return (
        <div className='body body__dashboard'>
            <Sidebar active={{[children]: 'active'}}/>
            <Container children={children} user={user}/>
        </div>
    )
}

export default Dashboard

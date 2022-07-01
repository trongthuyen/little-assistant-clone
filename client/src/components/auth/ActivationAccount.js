import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import AlertModal from '../../utils/alert/AlertModal'

function ActivationAccount() {
    const { activationToken } = useParams()
    const { activate } = useContext(AuthContext)
    const [alert, setAlert] = useState(null)

    useEffect(async () => {
        const rd = await activate({activationToken})
        console.log(rd)
        setAlert({
            type: rd.success? 'success' : 'danger',
            icon: rd.success? 'happy-alt' : 'sad',
            message: rd.success?
                `Chúc mừng bạn đã kích hoạt thành công, đăng nhập ngay để sử dụng dịch vụ` :
                `Kích hoạt thất bại, bạn có muốn đăng ký lại?`
        })
    }, [])

    return (
        <div className='body'>
            <section className='section section__auth'>
                <AlertModal info={alert}/>
            </section>
        </div>
    )
}

export default ActivationAccount

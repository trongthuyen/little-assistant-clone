import React from 'react'

function AlertModal({info}) {
    return info === null ? null : (
        <div className={`alert__modal alert__modal--${info.type}`}>
            <i className={`bx bx-${info.icon}`}></i>
            <p>{info.message}</p>
        </div>
    )
}

export default AlertModal

import React from 'react'

function AlertMessage({info}) {
    return info === null ? null : (
        <div className={`alert__message alert__message--${info.type}`}>
            <p>{info.message}</p>
        </div>
    )
}

export default AlertMessage

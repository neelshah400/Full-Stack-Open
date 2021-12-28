import React from 'react'

const Notification = ({ style, message }) => {

    if (message === null) {
        return null
    }

    return (
        <div className={style}>
            {message}
        </div>
    )

}

export default Notification
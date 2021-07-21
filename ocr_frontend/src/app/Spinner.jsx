import React from 'react'

import './Spinner.scss'

const Spinner = ({ isVisible }) => {
    return (
        <div className={`spinner ${isVisible ? 'visible' : ''}`}>
            <div className="spinner-circle">
                <div className="spinner-circle-gradient" />
                <div className="spinner-circle-inner" />
            </div>
        </div>
    )
}

export default Spinner

import React from 'react'

import './Button.scss'

const Button = ({ className, icon, label, onClick, secondary }) => {
    return (
        <div
            className={`button ${className} ${secondary ? 'outlined' : ''}`}
            onClick={onClick}
        >
            {
                icon && (
                    <span className="material-icons-outlined">
                        {icon}
                    </span>
                )
            }
            {label}
        </div>
    )
}

export default Button

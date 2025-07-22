import React from 'react';

import './notification.css';
import './adaptive.css';

export default function Notification({ icon, number, onClick }) {
    return (
        <button className="notification" onClick={ onClick }>
            <div className="notification__svg">{ icon }</div>
            <div className="notification__number">{ number }</div>
        </button>
    )
}

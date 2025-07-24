import React from 'react';

import './notification.scss';
import './adaptive.scss';

export default function Notification({ icon, number, onClick }) {
    return (
        <button className="notification" onClick={ onClick }>
            <div className="notification__svg">{ icon }</div>
            <div className="notification__number">{ number }</div>
        </button>
    )
}

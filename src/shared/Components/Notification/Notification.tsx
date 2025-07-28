import React from 'react';

import './notification.scss';
import './adaptive.scss';

type NotificationProps = {
    icon: React.ReactNode;
    number: number;
    onClick?: () => void;
}

export default function Notification({ 
    icon, 
    number, 
    onClick 
}: NotificationProps) {
    return (
        <button className="notification" onClick={ onClick }>
            <div className="notification__svg">{ icon }</div>
            {number !== 0 && 
                <div className="notification__number">
                    { number > 99 ? "99+" : number}
                </div>
            }
        </button>
    )
}

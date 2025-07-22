import React from 'react';

import './menuBurger.css';
import './adaptive.css';

export default function MenuBurger({ theme='light', onClick }) {
    const currentTheme = theme === 'dark' ? 'dark' : 'light';

    return (
        <button className={`menu-burger ${currentTheme}`} onClick={ onClick }>
            <span className="menu-burger__span"></span>
            <span className="menu-burger__span"></span>
            <span className="menu-burger__span"></span>
        </button>
    )
}

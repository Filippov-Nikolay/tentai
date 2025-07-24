import React from 'react';

import './menuBurger.scss';
import './adaptive.scss';

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

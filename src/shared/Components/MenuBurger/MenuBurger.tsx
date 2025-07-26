import React from 'react';

import './menuBurger.scss';
import './adaptive.scss';

type MenuBurgerProps = {
    theme?: 'light' | 'dark';
    onClick?: () => void;
}

export default function MenuBurger({ 
    theme = 'light', 
    onClick 
}: MenuBurgerProps) {
    return (
        <button className={`menu-burger ${theme}`} onClick={ onClick }>
            <span className="menu-burger__span"></span>
            <span className="menu-burger__span"></span>
            <span className="menu-burger__span"></span>
        </button>
    )
}

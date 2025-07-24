import React, { useState } from 'react';

import './switchBtn.css';
import './adaptive.css';

export default function SwitchBtn({
    onSwitch,
    value = false
}) {
    const handleSelect = () => {
        const newValue = !value;
        onSwitch?.(newValue); 
    }

    return (
        <button className={`switch-btn ${value ? "switch-btn--on" : ""}`} onClick={ handleSelect }>
            <span className="switch-btn__thumb"></span>
        </button>
    )
}

import React, { useState } from 'react';

import './switchBtn.css';
import './adaptive.css';

export default function SwitchBtn() {
    const[isSwitch, setSwitch] = useState(false);

    const handleSelect = () => {
        setSwitch(!isSwitch);
    }

    return (
        <button className={`switch-btn ${isSwitch ? "switch-btn--on" : ""}`} onClick={ handleSelect }>
            <span className="switch-btn__thumb"></span>
        </button>
    )
}

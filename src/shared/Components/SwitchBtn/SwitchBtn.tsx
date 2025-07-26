import React from 'react';

import './switchBtn.scss';
import './adaptive.scss';

type SwitchBtnProps = {
    value?: boolean;
    onSwitch?: (newValue: boolean) => void;
}

export default function SwitchBtn({
    value = false,
    onSwitch
}: SwitchBtnProps) {
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

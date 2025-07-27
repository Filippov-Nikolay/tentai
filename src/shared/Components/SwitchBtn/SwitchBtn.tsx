import React from 'react';

import './switchBtn.scss';
import './adaptive.scss';

type SwitchBtnProps = {
    theme?: string;
    label?: string;
    value?: boolean;
    onSwitch?: (newValue: boolean) => void;
}

export default function SwitchBtn({
    theme = 'light',
    label,
    value = false,
    onSwitch
}: SwitchBtnProps) {
    const handleSelect = () => {
        const newValue = !value;
        onSwitch?.(newValue); 
    }

    return (
        <div className={`switch-btn__wrapper ${theme}`}>
                <span className="switch-btn__label">{label}</span>
                <button className={`switch-btn ${value ? "switch-btn--on" : ""}`} onClick={ handleSelect }>
                <span className="switch-btn__thumb"></span>
            </button>
        </div>
    )
}

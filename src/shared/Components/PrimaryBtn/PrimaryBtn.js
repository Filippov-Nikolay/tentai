import React from 'react';

import './primaryBtn.css';
import './adaptive.css';

export default function PrimaryBtn({
    iconSvg,
    text,
    isDisabled = false
}) {
    return (
        <button type="button" className={`primary-btn ${isDisabled ? 'primary-btn--disabled' : ''}`}>
            {iconSvg && 
                <span className="primary-btn__svg">
                    {iconSvg}
                </span>
            }
            <span className="primary-btn__text">{ text }</span>
        </button>
    )
}

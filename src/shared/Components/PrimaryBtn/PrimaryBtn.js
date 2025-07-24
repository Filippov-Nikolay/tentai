import React from 'react';

import './primaryBtn.scss';
import './adaptive.scss';

export default function PrimaryBtn({
    iconSvg,
    text,
    isDisabled = false,
    onClick
}) {
    return (
        <button type="button" className={`primary-btn ${isDisabled ? 'primary-btn--disabled' : ''}`} onClick={ onClick } disabled={ isDisabled }>
            {iconSvg && 
                <span className="primary-btn__svg">
                    {iconSvg}
                </span>
            }
            <span className="primary-btn__text">{ text }</span>
        </button>
    )
}

import React from 'react';

import './primaryBtn.scss';
import './adaptive.scss';

type PrimaryBtnProps = {
    text: string;
    iconSvg?: React.ReactNode;
    theme?: 'light' | 'dark';
    isDisabled?: boolean;
    onClick?: () => void;
}

export default function PrimaryBtn({
    text,
    iconSvg,
    theme = 'light',
    isDisabled = false,
    onClick
}: PrimaryBtnProps) {
    return (
        <button type="button" className={`primary-btn ${theme} ${isDisabled ? 'primary-btn--disabled' : ''}`} onClick={ onClick } disabled={ isDisabled }>
            {iconSvg && 
                <span className="primary-btn__svg">{ iconSvg }</span>
            }
            <span className="primary-btn__text">{ text }</span>
        </button>
    )
}

import React from 'react';

import './formTextArea.scss';
import './adaptive.scss';

export default function FormTextArea({
    theme = "light",
    value = "",
    onChange,
    maxLength = 4000,
}) {
    let currentLength = value.length;
    const currentTheme = theme === 'dark' ? 'dark' : 'light';

    return (
        <div className={`form-text-area ${currentTheme}`}>
            <textarea 
                name="" 
                id="" 
                maxLength={ maxLength } 
                className="form-text-area__textarea" 
                value={ value } 
                onChange={ onChange }
            ></textarea>
            <div className="form-text-area__wrapper-count-character">
                <span className="form-text-area__count-character">{`${currentLength} / ${maxLength}`}</span>
            </div>
        </div>
    )
}

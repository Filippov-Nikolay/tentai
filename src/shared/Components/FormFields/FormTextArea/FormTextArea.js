import React from 'react';

import './formTextArea.css';
import './adaptive.css';

export default function FormTextArea({
    theme = "light",
    value = "",
    onChange,
    maxLength = 4000,
}) {
    let currentLength = value.length;

    return (
        <div className="form-text-area">
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

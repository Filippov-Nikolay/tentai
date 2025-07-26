import React from 'react';

import './formTextArea.scss';
import './adaptive.scss';

type FormTextAreaProps = {
    value?: string;
    theme?: 'light' | 'dark';
    maxLength?: number;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function FormTextArea({
    value = "",
    theme = "light",
    maxLength = 4000,
    onChange,
}: FormTextAreaProps) {
    let currentLength = value.length;

    return (
        <div className={`form-text-area ${theme}`}>
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

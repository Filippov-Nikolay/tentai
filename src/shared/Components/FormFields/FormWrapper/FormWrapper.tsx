import React from 'react';

import './formWrapper.scss';
import './adaptive.scss';

type FormWrapperProps = {
    theme?: 'light' | 'dark';
    componentsInput: React.ReactNode[];
};

export default function FormWrapper({
    theme = 'light',
    componentsInput
}: FormWrapperProps) {
    return (
        <div className={`form-wrapper ${theme}`}>
            {componentsInput && componentsInput.map((item, index) => (
                <div className="form-wrapper__item" key={index}>{item}</div>
            ))}
        </div>
    )
}

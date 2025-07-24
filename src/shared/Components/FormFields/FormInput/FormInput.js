import React, { useState, useRef } from 'react';

import './formInput.scss';
import './adaptive.scss';

export default function FormInput({ 
    theme = "light",
    label, 
    placeholder = "placeholder", 
    isRequirement = true,
    value = "",
    iconSVG,
    onClick,
    onChange,
    isInput = true,
    maxWidth,
    isInvalid = false,
    errorText = '',
    validate,
    pattern
}) {
    const currentTheme = theme === 'dark' ? 'dark' : 'light';
    const currentMaxWidth = (maxWidth && !isInput) && maxWidth + 3;

    const handleChange = (e) => {
        const newValue = e.target.value;

        if (pattern && !new RegExp(`^${pattern}$`).test(newValue)) {
            return;
        }

        if (validate && !validate(newValue)) {
            return;
        }

        onChange?.(e);
    };

    return (
        <div className={`form-input ${currentTheme}`}>
            {label && <label htmlFor="" className="form-input__label">
                <span className={`form-input__label-text 
                    ${isRequirement && "form-input__label-text--requirement"}`}>
                        { label }
                </span>
            </label>}
            <div className={
                `
                    form-input__wrapper-input 
                    ${!isInput ? "form-input__wrapper-input--only-read" : ""}
                    ${isInvalid ? 'form-input__wrapper-input--error' : ''}
                `
                } onClick={ !isInput ? onClick : undefined }>
                <input 
                    type="text" 
                    name="" 
                    id="" 
                    placeholder={ placeholder } 
                    className={ `form-input__input` }
                    readOnly={ !isInput }
                    value={ value } onChange={ handleChange } 
                    style={{
                        maxWidth: `${currentMaxWidth}ch` || undefined,
                        minWidth: `${currentMaxWidth}ch` || undefined
                    }}
                />
                {isInvalid  && <p className="form-input__error-message">{ errorText }</p>}
                {iconSVG && <button type="button" className="form-input__btn" onClick={ !isInput ? undefined : onClick }>{ iconSVG }</button>}
            </div>
        </div>
    )
}

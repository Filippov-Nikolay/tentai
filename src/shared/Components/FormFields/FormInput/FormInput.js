import React from 'react';

import './formInput.css';
import './adaptive.css';

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
    maxWidth
}) {
    const currentTheme = theme === 'dark' ? 'dark' : 'light';
    const currentMaxWidth = (maxWidth && !isInput) && maxWidth + 3;

    return (
        <div className={`form-input ${currentTheme}`}>
            {label && <label htmlFor="" className="form-input__label">
                <span className={`form-input__label-text 
                    ${isRequirement && "form-input__label-text--requirement"}`}>
                        { label }
                </span>
            </label>}
            <div className={`form-input__wrapper-input ${!isInput ? "form-input__wrapper-input--only-read" : ""}`} onClick={ !isInput ? onClick : undefined }>
                <input 
                    type="text" 
                    name="" 
                    id="" 
                    placeholder={ placeholder } 
                    className="form-input__input"
                    readOnly={ !isInput }
                    value={ value } onChange={onChange} 
                    style={{
                        maxWidth: `${currentMaxWidth}ch` || undefined,
                        minWidth: `${currentMaxWidth}ch` || undefined
                    }}
                />
                {iconSVG && <button type="button" className="form-input__btn" onClick={ !isInput ? undefined : onClick }>{ iconSVG }</button>}
            </div>
        </div>
    )
}

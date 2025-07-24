import React, { useState, useRef } from 'react';

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
    maxWidth,
    errorMsg = "Invalid input",
    pattern,
    validateFn
}) {
    const currentTheme = theme === 'dark' ? 'dark' : 'light';
    const currentMaxWidth = (maxWidth && !isInput) && maxWidth + 3;

    const [error, setError] = useState(false);
    const [errorText, setErrorText] = useState('');
    const debounceTimeout = useRef(null);
    const hasBlurred = useRef(false);

    const handleValidation = (val) => {
        if (validateFn) {
            const result = validateFn(val);
            if (result === true) {
                setError(false);
                setErrorText('');
            } else if (typeof result === 'string') {
                setError(true);
                setErrorText(result);
            }
            return;
        }

        if (isRequirement && val.trim() === '') {
            setError(true);
            setErrorText("Это поле обязательно");
        } else if (pattern) {
            const regex = new RegExp(pattern);
            if (!regex.test(val)) {
                setError(true);
                setErrorText(errorMsg);
            } else {
                setError(false);
                setErrorText('');
            }
        } else {
            setError(false);
            setErrorText('');
        }
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
                    ${error ? 'form-input__wrapper-input--error' : ''}
                `
                } onClick={ !isInput ? onClick : undefined }>
                <input 
                    type="text" 
                    name="" 
                    id="" 
                    placeholder={ placeholder } 
                    className={ `form-input__input` }
                    readOnly={ !isInput }
                    value={ value } onChange={onChange} 
                    style={{
                        maxWidth: `${currentMaxWidth}ch` || undefined,
                        minWidth: `${currentMaxWidth}ch` || undefined
                    }}
                    onBlur={() => {
                        hasBlurred.current = true;
                        handleValidation(value);
                    }}
                    pattern={ pattern }
                />
                {/* {error && <p className="form-input__error-message">{ errorText }</p>} */}
                {iconSVG && <button type="button" className="form-input__btn" onClick={ !isInput ? undefined : onClick }>{ iconSVG }</button>}
            </div>
        </div>
    )
}

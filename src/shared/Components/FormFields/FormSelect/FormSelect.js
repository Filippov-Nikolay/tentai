import React, { useState, useEffect } from 'react';

import './formSelect.scss';
import './adaptive.scss';

import FormInput from '../FormInput/FormInput';

export default function FormSelect({
    theme="light",
    label,
    placeholder = "placeholder", 
    isRequirement = true,
    iconSVG,
    options,
    defaultOptionIndex,
    onSelect,
    onChange,
    isInput = true,
    value = ""
}) {
    const currentTheme = theme === 'dark' ? 'dark' : 'light';

    const maxLength = Math.max(...options.map((item) => item.length));

    const [selectedIndex, setSelectedIndex] = useState(defaultOptionIndex && '');
    const [inputValue, setInputValue] = useState(options && options[defaultOptionIndex] || '');

    React.useEffect(() => {
        if (value !== undefined && value !== inputValue) {
            setInputValue(value);
        }
    }, [value]);

    const handleSelect = (index) => {
        setSelectedIndex(index);
        setInputValue(options[index]);
        setIsOpen(false);

        // Сообщаем наружу
        onSelect?.(options[index]);
        onChange?.(options[index]);
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        onChange?.(e.target.value);
    };

    const [isOpen, setIsOpen] = React.useState(false);
    const toggleMenu = () => setIsOpen(prev => !prev);

    return (
        <div className={`form-select ${currentTheme}`}>
            <div className="form-select__wrapper-input">
                <FormInput
                    label={ label }
                    isRequirement={ isRequirement }
                    iconSVG={ iconSVG }
                    placeholder={ placeholder }
                    onClick={ toggleMenu }
                    value={ isInput ? inputValue : options[selectedIndex] }
                    onChange={ isInput ? handleInputChange : undefined }
                    isInput={ isInput }
                    maxWidth={ maxLength }
                />
                <ul className={`form-select__menu ${isOpen ? '' : 'form-select__menu--hidden'}`}>
                    {options && options.map((item, index) => (
                        <li key={index} onClick={() => handleSelect(index)} className="form-select__item">{ item }</li>
                    ))} 
                </ul>
            </div>
        </div>
    )
}

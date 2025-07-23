import React, {useState} from 'react';

import './formSelect.css';
import './adaptive.css';

import FormInput from '../FormInput/FormInput';

export default function FormSelect({
    theme="light",
    label,
    placeholder = "placeholder", 
    isRequirement = true,
    iconSVG,
    options,
    defaultOptionIndex = 0,
    onSelect,
    isInput = true
}) {
    const currentTheme = theme === 'dark' ? 'dark' : 'light';

    const [selectedIndex, setSelectedIndex] = useState(defaultOptionIndex);
    const handleSelect = (index) => {
        setSelectedIndex(index);
        setInputValue(options[index]);
        setIsOpen(false);
        // Сообщаем наружу
        onSelect?.(options[index]);
    };

    const [isOpen, setIsOpen] = React.useState(false);
    const toggleMenu = () => setIsOpen(prev => !prev);

    const [inputValue, setInputValue] = useState(options[defaultOptionIndex] || '');

    return (
        <div className={`form-select ${currentTheme}`}>
            {/* {label && <label htmlFor="" className="form-select__label">
                <span className={`form-select__label-text 
                    ${isRequirement && "form-select__label-text--requirement"}`}>
                        { label }
                </span>
            </label>} */}
            <div className="form-select__wrapper-input">
                <FormInput
                    label={ label }
                    isRequirement={ isRequirement }
                    iconSVG={ iconSVG }
                    placeholder={ placeholder }
                    onClick={ toggleMenu }
                    value={ isInput ? inputValue : options[selectedIndex] }
                    onChange={ isInput ? (e) => setInputValue(e.target.value) : undefined }
                    isInput={ isInput }
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

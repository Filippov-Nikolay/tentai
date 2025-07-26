import React, { useState, useEffect } from 'react';

import './formSelect.scss';
import './adaptive.scss';

import FormInput from '../FormInput/FormInput';

type FormSelectType = {
    theme?: 'light' | 'dark';
    label?: string;
    placeholder?: string;
    isRequirement?: boolean;
    iconSVG?: React.ReactNode;
    options?: string[];
    defaultOptionIndex?: number;
    isInput?: boolean;
    value?: string;
    onSelect?: (value: string) => void;
    onChange?: (value: string) => void;
}

export default function FormSelect({
    theme="light",
    label,
    placeholder = "placeholder", 
    isRequirement = true,
    iconSVG,
    options = [],
    defaultOptionIndex,
    isInput = true,
    value = "",
    onSelect,
    onChange
}: FormSelectType) {
    const maxLength = options.length ? Math.max(...options.map(item => item.length)) : 10;

    const [selectedIndex, setSelectedIndex] = useState<number | null>(
        typeof defaultOptionIndex === 'number' ? defaultOptionIndex : null
    );
    const [inputValue, setInputValue] = useState(
        options && typeof defaultOptionIndex === 'number' ? options[defaultOptionIndex] : ''
    );

    React.useEffect(() => {
        if (value !== undefined && value !== inputValue) {
            setInputValue(value);
        }
    }, [value]);

    const handleSelect = (index: number) => {
        setSelectedIndex(index);
        setInputValue(options[index]);
        setIsOpen(false);

        // Сообщаем наружу
        onSelect?.(options[index]);
        onChange?.(options[index]);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        onChange?.(e.target.value);
    };

    const [isOpen, setIsOpen] = React.useState(false);
    const toggleMenu = () => setIsOpen(prev => !prev);

    return (
        <div className={`form-select ${theme}`}>
            <div className="form-select__wrapper-input">
                <FormInput
                    label={ label }
                    isRequirement={ isRequirement }
                    iconSVG={ iconSVG }
                    placeholder={ placeholder }
                    onClick={ toggleMenu }
                    value={isInput ? inputValue : (selectedIndex !== null ? options[selectedIndex] : '')}
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

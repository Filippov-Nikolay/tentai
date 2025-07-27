import React from 'react';

import './formInputSize.scss';
import './adaptive.scss';

// COMPONENTS
import FormSelect from '../FormSelect/FormSelect';

// ICON
import { ArrowSVG } from '../../../assets/svg/svgComponents';

type FormInputSizeProps = {
    theme?: 'light' | 'dark';
    label?: string;
    componentsInput: React.ReactNode[];
    value?: string;
    units: string[];
    onChange?: (newValue: string) => void;
}

export default function FormInputSize({
    theme,
    label,
    componentsInput,
    value,
    units,
    onChange
}: FormInputSizeProps) {
    return (
        <div className={`form-input-size ${theme}`}>
            <span className="form-input-size__label">{label}</span>
            <div className="form-input-size__content">
                {componentsInput && componentsInput.map((item, index) => (
                    <React.Fragment key={index}>
                        <div className="form-input-size__item">{item}</div>
                        {index < componentsInput.length - 1 && (
                            <span className="form-input-size__element">x</span>
                        )}
                    </React.Fragment>
                ))}
                <FormSelect
                    iconSVG={ <ArrowSVG/> }
                    isRequirement={ false }
                    options={ units }
                    defaultOptionIndex={ 0 }
                    isInput={ false }
                    value={ value }
                    onChange={ onChange }
                />
            </div>
        </div>
    )
}

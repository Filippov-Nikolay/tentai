import React, { useState } from 'react';

import './checkboxBtn.css';
import './adaptive.css';

export default function CheckboxBtn({
    onChange
}) {
    const [checked, setChecked] = useState(false);

    const toggleCheckbox = () => {
        const value = !checked;
        setChecked(value);
        onChange?.(value);
    };

    return (
        <button className="checkbox-btn" onClick={ toggleCheckbox }>
            <span className={`checkbox-btn__check-mark ${checked ? "" : "checkbox-btn__check-mark--hidden"}`}>✔</span>
        </button>
    )
}

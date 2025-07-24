import React from 'react';

import './note.scss';
import './adaptive.scss';

export default function Note({
    theme = "light",
    title,
    text,
    component
}) {
    const currentTheme = theme === 'dark' ? 'dark' : 'light';

    return (
        <div className={`note ${currentTheme}`}>
            {title && 
                <h4 className="note__title">
                    <span className="note__title-svg">{ component }</span>
                    <span className="note__title-text">{ title }</span>
                </h4>
            }
            {text && 
                <p className="note__text">{ text }</p>
            }
        </div>
    )
}

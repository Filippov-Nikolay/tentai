import React from 'react';

import './note.scss';
import './adaptive.scss';

export default function Note({
    title,
    text,
    component
}) {
    return (
        <div className="note">
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

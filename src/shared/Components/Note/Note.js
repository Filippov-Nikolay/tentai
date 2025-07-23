import React from 'react';

import './note.css';
import './adaptive.css';

export default function Note({
    title,
    text,
    iconSVG
}) {
    return (
        <div className="note">
            {title && 
                <h4 className="note__title">
                    <span className="note__title-svg">{ iconSVG }</span>
                    <span className="note__title-text">{ title }</span>
                </h4>
            }
            {text && 
                <p className="note__text">{ text }</p>
            }
        </div>
    )
}

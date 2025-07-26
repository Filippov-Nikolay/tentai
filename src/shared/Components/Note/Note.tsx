import React from 'react';

import './note.scss';
import './adaptive.scss';

type NoteTypeProps = {
    title?: string;
    text?: string;
    component?: React.ReactNode;
    theme?: 'light' | 'dark';
}

export default function Note({
    title,
    text,
    component,
    theme = "light"
}: NoteTypeProps) {
    return (
        <div className={`note ${theme}`}>
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

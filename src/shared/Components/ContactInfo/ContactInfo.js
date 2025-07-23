import React, { useState } from 'react';

import './contactInfo.css';
import './adaptive.css';

import { EditSVG } from '../../assets/svg/svgComponents';

export default function ContactInfo({
}) {
    const[isEdit, setEdit] = useState(true);

    const handleSelect = () => {
        setEdit(!isEdit);
    }

    return (
        <div className="contact-info">
            <div className="contact-info__wrapper">
                <div className="contact-info__item contact-info__item--left">
                    <div className="contact-info__info-item">
                        <label className="contact-info__label">Full name</label>
                        <label className="contact-info__label">Email</label>
                        <label className="contact-info__label">Phone number</label>
                    </div>
                    <div className="contact-info__info-item">
                        <input 
                            className={`contact-info__input ${!isEdit ? '' : 'contact-info__input--edit'}`} 
                            readOnly={ !isEdit } 
                            type='text'
                        ></input> 
                        <input 
                            className={`contact-info__input ${!isEdit ? '' : 'contact-info__input--edit'}`} 
                            readOnly={ !isEdit } 
                            type='email'
                        ></input> 
                        <input 
                            className={`contact-info__input ${!isEdit ? '' : 'contact-info__input--edit'}`} 
                            readOnly={ !isEdit } 
                            type='number'
                        ></input> 
                    </div>
                </div>
                <div className="contact-info__item contact-info__item--right">
                    <button className="contact-info__btn" onClick={ handleSelect }>
                        <span className="contact-info__btn-text">{!isEdit ? 'edit' : 'save'}</span>
                        <span className="contact-info__btn-svg">{ <EditSVG/> }</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

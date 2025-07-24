import React, { useState, useEffect } from 'react';

import './contactInfo.scss';
import './adaptive.scss';

import { EditSVG } from '../../assets/svg/svgComponents';

export default function ContactInfo({
    theme = "light",
    contact,
    setContact,
    isEditDef = true,
    onEditChange
}) {
    const currentTheme = theme === 'dark' ? 'dark' : 'light';

    const[isEdit, setEdit] = useState(isEditDef);
    const [tempContact, setTempContact] = useState(contact);

    useEffect(() => {
        setTempContact(contact);
    }, [contact]);

    const handleToggleEdit = () => {
        if (isEdit) {
            setContact(tempContact);
        }
        
        const newEditState = !isEdit;
        setEdit(newEditState);
        onEditChange?.(newEditState);
    };

    return (
        <div className={`contact-info ${currentTheme}`}>
            <div className="contact-info__wrapper">
                <div className="contact-info__item contact-info__item--left">
                    <div className="contact-info__info-item">
                        <label className="contact-info__label">Full name</label>
                        <input 
                            className={`contact-info__input ${!isEdit ? '' : 'contact-info__input--edit'}`} 
                            readOnly={ !isEdit } 
                            type='text'
                            value={contact.fullName}
                            onChange={e => setContact({...contact, fullName: e.target.value})}
                        ></input> 
                    </div>
                    <div className="contact-info__info-item">
                        <label className="contact-info__label">Email</label>
                        <input 
                            className={`contact-info__input ${!isEdit ? '' : 'contact-info__input--edit'}`} 
                            readOnly={ !isEdit } 
                            type='email'
                            value={contact.email}
                            onChange={e => setContact({...contact, email: e.target.value})}
                        ></input> 
                    </div>
                    <div className="contact-info__info-item">
                        <label className="contact-info__label">Phone number</label>
                        <input 
                            className={`contact-info__input ${!isEdit ? '' : 'contact-info__input--edit'}`} 
                            readOnly={ !isEdit } 
                            type='number'
                            value={contact.phoneNumber}
                            onChange={e => setContact({...contact, phoneNumber: e.target.value})}
                        ></input>
                    </div>
                </div>
                <div className="contact-info__item contact-info__item--right">
                    <button className="contact-info__btn" onClick={ handleToggleEdit } disabled={
                            isEdit && (
                            !tempContact.fullName.trim() ||
                            !tempContact.email.trim() ||
                            !tempContact.phoneNumber.trim())}>
                        <span className="contact-info__btn-text">{!isEdit ? 'edit' : 'save'}</span>
                        <span className="contact-info__btn-svg">{ <EditSVG/> }</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

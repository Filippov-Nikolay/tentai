import React, { useState } from 'react';

import './styles/main.css';
import './styles/adaptive.css';

// COMPONENTS
import Header from '../../shared/Components/Header/Header';
import RouteDetails from '../../shared/Components/RouteDetails/RouteDetails';
import SubTitle from '../../shared/Components/SubTitle/SubTitle'
import ContactInfo from '../../shared/Components/ContactInfo/ContactInfo';
import Note from '../../shared/Components/Note/Note'
import SwitchBtn from '../../shared/Components/SwitchBtn/SwitchBtn';
import Order from '../../shared/Components/Order/Order';
import PrimaryBtn from '../../shared/Components/PrimaryBtn/PrimaryBtn';

// COMPONENTS - FormFields
import FormInput from '../../shared/Components/FormFields/FormInput/FormInput'
import FormSelect from '../../shared/Components/FormFields/FormSelect/FormSelect';
import FormTextArea from '../../shared/Components/FormFields/FormTextArea/FormTextArea';

// ICONS
import { CalendarSVG, ArrowSVG, WalletSVG } from '../../shared/assets/svg/svgComponents';

export default function Index({ theme='light' }) {
    const currentTheme = theme === 'dark' ? 'dark' : 'light';

    const [inputComment, setInputComment] = useState('');

    return (
        <>
            <Header 
                theme={ currentTheme }
            />
            <div className="container">
                <h1 className="index__title">Checkout</h1>
                <div className="index__wrapper">
                    <div className="index__left-bar">
                        <section className="index__section">
                            <div className="index__sub-title">
                                <SubTitle 
                                    text={ "Route" }
                                />
                            </div>
                            <div className="index__route-details">
                                {/* 
                                    1. Занесение вводимых данных в объект 
                                    2. Заменить в компоненте RouteDetails, 
                                        блок на FormInput
                                */}
                                <RouteDetails
                                    title={ "Download location" }
                                    point={ "A" }
                                    theme={ currentTheme }
                                />
                            </div>
                        </section>
                        {/* Need to FIX */}
                        <section className="index__section">
                            <div className="index__sub-title">
                                <SubTitle 
                                    text={ "About the cargo" }
                                />
                            </div>
                            <div className="index__about">
                                <div className="index__about-item">
                                    <FormInput
                                        label={ "Date of upload" }
                                        placeholder={ "Thailand, Phuket, Rat Burana.." }
                                        iconSVG={ <CalendarSVG/> }
                                    />
                                </div>
                                <div className="index__about-item">
                                    <FormInput
                                        label={ "Time of arrival" }
                                        placeholder={ "Enter hour" }
                                    />
                                </div>
                                <div className="index__about-item">
                                    <FormInput
                                        label={ "Cargo weight (kg)" }
                                        placeholder={ "Placeholder" }
                                        isRequirement={ false }
                                    />
                                </div>
                                <div className="index__about-item">
                                    <FormSelect
                                        label={ "Type of cargo" }
                                        placeholder={ "Placeholder" }
                                        isRequirement={ false }
                                        iconSVG={ <ArrowSVG/> }
                                        options={ ["test 1", "test 2", "test 3"] }
                                    />
                                </div>
                                {/* ДОРАБОТАТЬ */}
                                <div className="index__about-item">
                                    <div className="index__about-wrapper">
                                        <FormInput
                                            // label={ "Cargo size of the LWH (m)" }
                                            placeholder={ "105" }
                                            isRequirement={ false }
                                        />
                                        <span className="index__about-wrapper-element">x</span>  
                                        <FormInput
                                            placeholder={ "105" }
                                            isRequirement={ false }
                                        />
                                        <span className="index__about-wrapper-element">x</span>  
                                        <FormInput
                                            placeholder={ "105" }
                                            isRequirement={ false }
                                        />
                                        <FormSelect
                                            placeholder={ "Placeholder" }
                                            isRequirement={ false }
                                            iconSVG={ <ArrowSVG/> }
                                            options={ ["cm", "mm", "dm"] }
                                            isInput={ false }
                                        />  
                                    </div>
                                </div>
                                <div className="index__about-item">
                                    <div className="index__about-wrapper index__about-wrapper--center">
                                        <span className="index__about-text">Forwarding service</span>
                                        <SwitchBtn/>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section className="index__section">
                            <div className="index__sub-title">
                                <SubTitle 
                                    text={ "Leave a comment" }
                                />
                            </div>
                            <div className="index__comment">
                                    <FormTextArea
                                        onChange={ (e) => setInputComment(e.target.value) }
                                        value={ inputComment }
                                    />
                                </div>
                        </section>
                        <section className="index__section">
                            <div className="index__sub-title">
                                <SubTitle 
                                    text={ "Contact information" }
                                />
                            </div>
                            <div className="index__contact-info">
                                <ContactInfo/>
                            </div>
                        </section>
                        <section className="index__section">
                            <div className="index__sub-title">
                                <SubTitle 
                                    text={ "Payment" }
                                />
                            </div>
                            <div className="index__payment">
                                <Note
                                    component={ <WalletSVG/> }
                                    title={ "Payment on receipt" }
                                    text={ "Avoid online transactions and pay only when you receive your order. This will guarantee your financial security and avoid any risks associated with electronic payments." }
                                />
                            </div>
                        </section>
                    </div>
                    <div className="index__right-bar">
                        <div className="index__sub-title">
                            <SubTitle 
                                text={ "Order" }
                            />
                        </div>
                        <Order/>
                    </div>
                    <div className="index__primary-btn">
                        <PrimaryBtn
                            text={ "Continue" }
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

import React from 'react';

import './styles/main.css';

// COMPONENTS
import Header from '../../shared/Components/Header/Header';
import RouteDetails from '../../shared/Components/RouteDetails/RouteDetails';
import SubTitle from '../../shared/Components/SubTitle/SubTitle'

// COMPONENTS - FormFields
import FormInput from '../../shared/Components/FormFields/FormInput/FormInput'
import FormSelect from '../../shared/Components/FormFields/FormSelect/FormSelect';

// ICONS
import { CalendarSVG, ArrowSVG } from '../../shared/assets/svg/svgComponents';

export default function Index({ theme='light' }) {
    const currentTheme = theme === 'dark' ? 'dark' : 'light';

    return (
        <>
            <div className="index__header">
                <Header 
                    theme={ currentTheme }
                />
            </div>
            <div className="container">
                <h1 className="index__title">Checkout</h1>
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
                                    label={ "Cargo size of the LWH (m)" }
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
                    </div>
                </section>
            </div>
        </>
    )
}

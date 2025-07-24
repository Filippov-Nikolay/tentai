import React, { useState, useEffect } from 'react';

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
import Footer from '../../shared/Components/Footer/Footer';

// COMPONENTS - FormFields
import FormInput from '../../shared/Components/FormFields/FormInput/FormInput'
import FormSelect from '../../shared/Components/FormFields/FormSelect/FormSelect';
import FormTextArea from '../../shared/Components/FormFields/FormTextArea/FormTextArea';

// ICONS
import { CalendarSVG, ArrowSVG, WalletSVG } from '../../shared/assets/svg/svgComponents';

export default function Index({ theme='light' }) {
    const costPerKm = 10;               /* стоимость за 1 км */;
    const costPerHourLoading = 100;       /* стоимость времени работы (загрузка/разгрузка) за 1 час */
    const commissionRate = 0.3;         /* 30% комиссия */
    const forwardingServiceRate = 0.2;  /* 20% экспедиторские услуги от стоимости пути */

    // THEME
    const currentTheme = theme === 'dark' ? 'dark' : 'light';

    // ROUTE
    const[currentRoutes, setCurrentRoutes] = useState([]);

    // ABOUT
    const[dateOfUpload, setDateOfUpload] = useState('');
    const[timeOfArrival, setTimeOfArrival] = useState('');
    const[cargoWeight, setCargoWeight] = useState(0.0);
    const[typeOfCargo, setTypeOfCargo] = useState('');
    const[cargoSize, setCargoSize] = useState({}); // или начни с: { length: 0, weight: 0, height: 0, unit: '' }
    const[forwardingService, setForwardingService] = useState(false);

    // LEAVE A COMMENT
    const[inputComment, setInputComment] = useState('');

    // CONTACT INFORMATION
    const [contact, setContact] = useState({
        fullName: '',
        email: '',
        phoneNumber: ''
    });

    const[isOrder, setIsOrder] = useState(false);
    useEffect(() => {
        if (
            dateOfUpload.length === 0 || 
            timeOfArrival.length === 0 || 
            contact.fullName.length === 0 ||
            contact.email.length === 0 ||
            contact.phoneNumber.length === 0
        ) {
            setIsOrder(true);
        } else {
            setIsOrder(false);
        }
    }, [dateOfUpload, timeOfArrival, contact]);

    let result = [
        {
            "title": "route",
            "currentRoutes": currentRoutes
        },
        {
            "title": "about",
            "dateOfUpload": dateOfUpload,
            "timeOfArrival": timeOfArrival,
            "cargoWeight": cargoWeight,
            "typeOfCargo": typeOfCargo,
            "cargoSize": cargoSize,
            "forwardingService": forwardingService
        },
        {
            "title": "leaveComment",
            "comment": inputComment
        },
        {
            "title": "contactInformation",
            "contact": contact
        }
    ]

    // Общее расстояние
    let totalDistanceKm = 0;  
    
    // Количество отработанных часов (загрузка + разгрузка)
    let hoursWorked = 0;                   
    
    currentRoutes.forEach(item => {
        totalDistanceKm += parseFloat(item.distanceToNext) || 0;
        hoursWorked += parseFloat(item.hoursValue) || 0;
    });

    // Стоимость за общее расстояние
    let distanceCost = Math.round(totalDistanceKm * costPerKm * 100) / 100;

    // Cтоимость работы по загрузке/разгрузке
    let loadingCost = Math.round(hoursWorked * costPerHourLoading * 100) / 100;

    const handleChange = () => {
        console.log(result);
        console.log(`${distanceCost} ${loadingCost} ${hoursWorked}`)
    }

    const[isShowRightBar, setIsShowRightBar] = useState(false);
    const handleChangeShowLeftBar = () => {
        setIsShowRightBar(!isShowRightBar);
    }
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 805) {
                setIsShowRightBar(false);
            }
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Стоимость за экспедиторские услуги
    const forwardingServicesCost = Math.round(distanceCost * forwardingServiceRate * 100) / 100;

    // Комиссия 
    const commissionCost = Math.round(distanceCost * commissionRate * 100) / 100;

    // Общая сумма к оплате
    const totalSum = distanceCost + loadingCost;

    let firstPoint = currentRoutes[0]?.point;
    let lastPoint = currentRoutes[currentRoutes.length - 1]?.point;
    let nameFirstPoint = currentRoutes[0]?.inputValue;
    let nameLastPoint = currentRoutes[currentRoutes.length - 1]?.inputValue;

    return (
        <>
            <Header 
                theme={ currentTheme }
            />
            <div className="container">
                <div className="index__wrapper-title">
                    <h1 className="index__title">Checkout</h1>
                    <button className={`index__arrow-back ${isShowRightBar ? "index__arrow-back--show" : ""}`} onClick={ handleChangeShowLeftBar }>
                        <span className="index__arrow-back-svg"><ArrowSVG></ArrowSVG></span>
                        <span className="index__arrow-back-text">Back</span>
                    </button>
                </div>
                <div className="index__wrapper">
                    <div className={`index__left-bar ${isShowRightBar ? "index__left-bar--hidden" : ""}`}>
                        {/* ROUTE */}
                        <section className="index__section">
                            <div className="index__sub-title">
                                <SubTitle 
                                    text={ "Route" }
                                />
                            </div>
                            <div className="index__route-details">
                                <RouteDetails
                                    theme={ currentTheme }
                                    onRoutesChange={ setCurrentRoutes }
                                />
                            </div>
                        </section>

                        {/* ABOUT THE CARGO */}
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
                                        value={ dateOfUpload }
                                        onChange={ (e) => setDateOfUpload(e.target.value) }
                                    />
                                </div>
                                <div className="index__about-item">
                                    <FormInput
                                        label={ "Time of arrival" }
                                        placeholder={ "Enter hour" }
                                        value={ timeOfArrival }
                                        onChange={ (e) => setTimeOfArrival(e.target.value) }
                                    />
                                </div>
                                <div className="index__about-item">
                                    <FormInput
                                        label={ "Cargo weight (kg)" }
                                        placeholder={ "Placeholder" }
                                        isRequirement={ false }
                                        value={ cargoWeight }
                                        onChange={ (e) => setCargoWeight(e.target.value) }
                                    />
                                </div>
                                <div className="index__about-item">
                                    <FormSelect
                                        label={ "Type of cargo" }
                                        placeholder={ "Placeholder" }
                                        isRequirement={ false }
                                        iconSVG={ <ArrowSVG/> }
                                        options={ ["test 1", "test 2", "test 3"] }
                                        value={ typeOfCargo }
                                        onChange={ (e) => setTypeOfCargo(e) }
                                    />
                                </div>
                                <div className="index__about-item">
                                    <span className="index__about-span">Cargo size of the LWH (m)</span>
                                    <div className="index__about-wrapper">
                                        <FormInput
                                            placeholder={ "105" }
                                            isRequirement={ false }
                                            value={ cargoSize.length }
                                            onChange={ (e) => setCargoSize(prev => ({ ...prev, length: e.target.value })) }
                                        />
                                        <span className="index__about-wrapper-element">x</span>  
                                        <FormInput
                                            placeholder={ "105" }
                                            isRequirement={ false }
                                            value={ cargoSize.weight }
                                            onChange={ (e) => setCargoSize(prev => ({ ...prev, weight: e.target.value })) }
                                        />
                                        <span className="index__about-wrapper-element">x</span>  
                                        <FormInput
                                            placeholder={ "105" }
                                            isRequirement={ false }
                                            value={ cargoSize.height }
                                            onChange={ (e) => setCargoSize(prev => ({ ...prev, height: e.target.value })) }
                                        />
                                        <FormSelect
                                            iconSVG={ <ArrowSVG/> }
                                            isRequirement={ false }
                                            options={ ["cm", "mm", "dm"] }
                                            defaultOptionIndex={ 0 }
                                            isInput={ false }
                                            value={ cargoSize.unit }
                                            onChange={ (e) => setCargoSize(prev => ({ ...prev, unit: e })) }
                                        />  
                                    </div>
                                </div>
                                <div className="index__about-item">
                                    <div className="index__about-wrapper index__about-wrapper--center">
                                        <span className="index__about-text">Forwarding service</span>
                                        <SwitchBtn
                                            onSwitch={ setForwardingService }
                                            value={ forwardingService }                                           
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* LEAVE A COMMENT */}
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

                        {/* CONTACT INFORMATION */}
                        <section className="index__section">
                            <div className="index__sub-title">
                                <SubTitle 
                                    text={ "Contact information" }
                                />
                            </div>
                            <div className="index__contact-info">
                                <ContactInfo
                                    contact={ contact } setContact={ setContact }
                                />
                            </div>
                        </section>

                        {/* PAYMENT */}
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
                    <div className={`index__right-bar ${isShowRightBar ? "index__right-bar--show" : ""}`}>
                        <div className="index__sub-title">
                            <SubTitle 
                                text={ "Order" }
                            />
                        </div>
                        <Order
                            title={ "Ecological cleaning and maintenance services for home" }
                            currency={ "THB" }
                            location={ "Bangkok" }
                            rating={ 5.0 }
                            bannerText={ "top seller" }

                            firstPoint={ firstPoint }
                            lastPoint={ lastPoint }
                            nameFirstPoint={ nameFirstPoint }
                            nameLastPoint={ nameLastPoint }

                            loadingAndUploadingPrice={ loadingCost }
                            payment={ distanceCost }
                            forwardingService={ forwardingServicesCost }
                            serviceCommission={ commissionCost }
                            totalPrice={ totalSum }

                            isDisabled={ isOrder }

                            onClick={ handleChange }
                        />
                    </div>
                    <div className={`index__primary-btn ${isShowRightBar ? "index__primary-btn--hidden" : ""}`}>
                        <PrimaryBtn
                            text={ "Continue" }
                            isDisabled={ isOrder }
                            onClick={ handleChangeShowLeftBar }
                        />
                    </div>
                </div>
            </div>
            <div className={`index__footer ${isShowRightBar ? "index__footer--hidden" : ""}`}>
                <Footer/>
            </div>
        </>
    )
}

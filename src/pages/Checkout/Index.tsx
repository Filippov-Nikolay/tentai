import React, { useState, useEffect, useRef } from 'react';

import './styles/main.scss';
import './styles/adaptive.scss';

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

// SERVICES
import { calculateDistances } from './services/apiService'

// ICONS
import { CalendarSVG, ArrowSVG, WalletSVG } from '../../shared/assets/svg/svgComponents';

type Route = {
    title: string;
    point: string;
    isTrash: boolean;
    inputValue: string;
    hoursValue: number;
    distanceToNext: number | null;
}
type CargoSize = {
    length: string;
    weight: string;
    height: string;
    unit: string;
}

export default function Index({ theme='light' }) {
    // API
    const ORS_API_KEY = process.env.REACT_APP_API_KEY_ROUTE;

    const costPerKm = 10;               /* стоимость за 1 км */;
    const costPerHourLoading = 100;     /* стоимость времени работы (загрузка/разгрузка) за 1 час */
    const commissionRate = 0.3;         /* 30% комиссия */
    const forwardingServiceRate = 0.2;  /* 20% экспедиторские услуги от стоимости пути */

    // THEME
    const currentTheme = theme === 'dark' ? 'dark' : 'light';

    const[firstPoint, setFirstPoint] = useState('');
    const[nameFirstPoint, setNameFirstPoint] = useState('');
    const[lastPoint, setLastPoint] = useState('');
    const[nameLastPoint, setNameLastPoint] = useState('');

    // ROUTE
    const [currentRoutes, setCurrentRoutes] = useState<Route[]>(() => {
        const saved = localStorage.getItem('currentRoutes');
        return saved ? JSON.parse(saved) : [
            { title: 'Download location', point: 'A', isTrash: false, inputValue: '', hoursValue: 0, distanceToNext: null },
            { title: 'Place of unloading', point: 'B', isTrash: false, inputValue: '', hoursValue: 0, distanceToNext: null },
        ];
    });

    // Общее расстояние
    const[totalDistanceKm, setTotalDistanceKm] = useState(0);
    
    // Количество отработанных часов (загрузка + разгрузка)
    const[hoursWorked, setHoursWorked] = useState(0);
    
    const [distanceCost, setDistanceCost] = useState(0);
    const [loadingCost, setLoadingCost] = useState(0);
    const [forwardingServicesCost, setForwardingServicesCost] = useState(0);
    const [commissionCost, setCommissionCost] = useState(0);
    const [totalSum, setTotalSum] = useState(0);
    
    // Debounce route
    const debounceTimerStorage = useRef<number | undefined>(undefined);
    useEffect(() => {
        if (debounceTimerStorage.current) {
            clearTimeout(debounceTimerStorage.current);
        }

        debounceTimerStorage.current = window.setTimeout(() => {
            localStorage.setItem('currentRoutes', JSON.stringify(currentRoutes));

            const nonEmptyRoutes = currentRoutes.filter(route => route.inputValue?.trim());
            if (nonEmptyRoutes.length === 0) {
                setTotalDistanceKm(0);
                setFirstPoint('');
                setNameFirstPoint('');
                setLastPoint('');
                setNameLastPoint('');
                return;
            }

            const hours = nonEmptyRoutes.reduce(
                (sum, item) => sum + (item.hoursValue || 0), 0
            );
            setHoursWorked(hours);

            // Если только одна точка — решаем, она first или last
            if (nonEmptyRoutes.length === 1) {
                const only = nonEmptyRoutes[0];
                const isFirst = only.point.toUpperCase() <= 'A';

                console.log(only.point.toUpperCase(), isFirst);

                setFirstPoint(isFirst ? only.point : '');
                setNameFirstPoint(isFirst ? only.inputValue : '');
                setLastPoint(!isFirst ? only.point : '');
                setNameLastPoint(!isFirst ? only.inputValue : '');

                return;
            }

            // Ищем first и last по алфавиту
            const sortedRoutes = [...nonEmptyRoutes].sort((a, b) =>
                a.point.localeCompare(b.point)
            );

            const first = sortedRoutes[0];
            const last = sortedRoutes[sortedRoutes.length - 1];

            setFirstPoint(first.point || '');
            setNameFirstPoint(first.inputValue || '');
            setLastPoint(last.point || '');
            setNameLastPoint(last.inputValue || '');
        }, 500);

        return () => clearTimeout(debounceTimerStorage.current);
    }, [currentRoutes]);


    const debounceTimerCalculate = useRef<number | undefined>(undefined);
    useEffect(() => {
        if (debounceTimerCalculate.current) {
            clearTimeout(debounceTimerCalculate.current);
        }

        const allField = currentRoutes.every(route => 
            route.inputValue.trim() !== ''
        );

        if (!allField) {
            return;
        }

        debounceTimerCalculate.current = window.setTimeout(() => {
            calculateDistances(currentRoutes, setCurrentRoutes, String(ORS_API_KEY));
        }, 500);
    }, [currentRoutes.map(route => route.inputValue).join('||')]);

    const debounceTimerTotal = useRef<number | undefined>(undefined);
    useEffect(() => {
        if (debounceTimerTotal.current) {
            clearTimeout(debounceTimerTotal.current);
        }

        const allField = currentRoutes.every(route => 
            route.inputValue.trim() !== ''
        );

        if (!allField) {
            return;
        }

        debounceTimerTotal.current = window.setTimeout(() => {
            const total = currentRoutes.reduce(
                (sum, item) => sum + (item.distanceToNext || 0), 0
            );

            setTotalDistanceKm(Number(total.toFixed(2)));
        }, 500);
    }, [currentRoutes.map(route => route.distanceToNext).join('||')]);

    useEffect(() => {
        const newDistanceCost = Math.round(totalDistanceKm * costPerKm * 100) / 100;
        const newLoadingCost = Math.round(hoursWorked * costPerHourLoading * 100) / 100;
        const newForwardingCost = Math.round(newDistanceCost * forwardingServiceRate * 100) / 100;
        const newCommissionCost = Math.round(newDistanceCost * commissionRate * 100) / 100;
        const newTotalSum = newDistanceCost + newLoadingCost + newForwardingCost + newCommissionCost;

        setDistanceCost(newDistanceCost);
        setLoadingCost(newLoadingCost);
        setForwardingServicesCost(newForwardingCost);
        setCommissionCost(newCommissionCost);
        setTotalSum(Number(newTotalSum.toFixed(2)));
    }, [totalDistanceKm, hoursWorked, costPerKm, costPerHourLoading, forwardingServiceRate, commissionRate]);

    // ABOUT
    const[dateOfUpload, setDateOfUpload] = useState(() => 
        localStorage.getItem('dateOfUpload') || ''
    );
    useEffect(() => {
        localStorage.setItem('dateOfUpload', dateOfUpload);
    }, [dateOfUpload]);

    const [timeOfArrival, setTimeOfArrival] = useState(() => 
        localStorage.getItem('timeOfArrival') || ''
    );
    useEffect(() => {
        localStorage.setItem('timeOfArrival', timeOfArrival);
    }, [timeOfArrival]);

    const [cargoWeight, setCargoWeight] = useState(() => 
        localStorage.getItem('cargoWeight') || "0"
    );
    useEffect(() => {
        localStorage.setItem('cargoWeight', cargoWeight);
    }, [cargoWeight]);

    const [typeOfCargo, setTypeOfCargo] = useState(() => 
        localStorage.getItem('typeOfCargo') || ''
    );
    useEffect(() => {
        localStorage.setItem('typeOfCargo', typeOfCargo);
    }, [typeOfCargo]);

    const [cargoSize, setCargoSize] = useState<CargoSize>(() => {
        const saved = localStorage.getItem('cargoSize');
        return saved ? JSON.parse(saved) : { length: '', weight: '', height: '', unit: '' };
    });
    useEffect(() => {
        localStorage.setItem('cargoSize', JSON.stringify(cargoSize));
    }, [cargoSize]);

    const [forwardingService, setForwardingService] = useState(() => {
        const saved = localStorage.getItem('forwardingService');
        return saved === 'true';
    });
    useEffect(() => {
        localStorage.setItem('forwardingService', forwardingService ? 'true' : 'false');
    }, [forwardingService]);

    // LEAVE A COMMENT
    const [inputComment, setInputComment] = useState(() => 
        localStorage.getItem('inputComment') || ''
    );
    useEffect(() => {
        localStorage.setItem('inputComment', inputComment);
    }, [inputComment]);

    // CONTACT INFORMATION
    const [contact, setContact] = useState(() => {
        const saved = localStorage.getItem('contact');
        return saved ? JSON.parse(saved) : { fullName: '', email: '', phoneNumber: '' };
    });
    useEffect(() => {
        localStorage.setItem('contact', JSON.stringify(contact));
    }, [contact]);

    const [isEdit, setIsEdit] = useState(() => {
        const saved = localStorage.getItem('isEdit');
        return saved === 'true';
    });
    useEffect(() => {
        localStorage.setItem('isEdit', isEdit ? 'true' : 'false');
    }, [isEdit]);


    const handleChange = () => {
        alert("Данные отправлены!");
        console.log(result);
    }

    const validateDate = (val: string) => {
        if (val === '') return true;

        const dateRegex = /^\d{2}\.\d{2}\.\d{4}$/;
        if (!dateRegex.test(val)) return false;

        const [d, m, y] = val.split('.').map(Number);
        const inputDate = new Date(y, m - 1, d);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (
            inputDate.getDate() !== d ||
            inputDate.getMonth() !== m - 1 ||
            inputDate.getFullYear() !== y
        ) { return false; }

        return inputDate >= today;
    };

    const [isInvalid, setIsInvalid] = useState(false);
    const handelSetDateOfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setDateOfUpload(val);
        setIsInvalid(!validateDate(val));
    };


    const validateTime = (val: string): boolean => {
        if (val === '') return true;
        const timeRegex = /^([01]?\d|2[0-3]):([0-5]?\d)$/;
        return timeRegex.test(val);
    };

    const [isTimeInvalid, setIsTimeInvalid] = useState(false);
    const handleSetTimeOfArrival = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setTimeOfArrival(val);
        setIsTimeInvalid(!validateTime(val));
    };

    const [isOrder, setIsOrder] = useState(false);
    useEffect(() => {
        const allFilledRoutes = currentRoutes.every(route => 
            route.inputValue.trim() !== '' && 
            route.hoursValue !== null &&
            route.hoursValue !== undefined
        );

        if (
            dateOfUpload.length === 0 || 
            timeOfArrival.length === 0 || 
            contact.fullName.length === 0 ||
            contact.email.length === 0 ||
            contact.phoneNumber.length === 0 ||
            !allFilledRoutes
        ) {
            setIsOrder(true);
        } else {
            setIsOrder(false);
        }
    }, [dateOfUpload, timeOfArrival, contact, currentRoutes]);

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

    const[isShowRightBar, setIsShowRightBar] = useState(false);
    const handleChangeShowLeftBar = () => {
        setIsShowRightBar(!isShowRightBar);
    }

    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
        setIsOpen(!isOpen);        
    };
    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : '';
    }, [isOpen]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 805) {
                setIsShowRightBar(false);
            }
            if (window.innerWidth > 990) {
                setIsOpen(false);
            }
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            <Header 
                theme={ currentTheme }
                onChange={ toggleMenu }
                value={ isOpen }
            />
            {isOpen && <div className="backdrop" onClick={() => setIsOpen(false)} />}
            <div className="container">
                <div className="index__wrapper-title">
                    <h1 className={`index__title ${currentTheme}`}>Checkout</h1>
                    <button className={`index__arrow-back ${currentTheme} ${isShowRightBar ? "index__arrow-back--show" : ""}`} onClick={ handleChangeShowLeftBar }>
                        <span className="index__arrow-back-svg"><ArrowSVG></ArrowSVG></span>
                        <span className="index__arrow-back-text">Back</span>
                    </button>
                </div>
                <div className="index__wrapper">
                    <div className={`index__left-bar ${theme} ${isShowRightBar ? "index__left-bar--hidden" : ""}`}>
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
                                    routesData={ currentRoutes }
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
                                        placeholder={ "dd.mm.yyyy" }
                                        iconSVG={ <CalendarSVG/> }
                                        value={ dateOfUpload }
                                        onChange={ handelSetDateOfUpload }
                                        pattern="\d{0,2}(\.\d{0,2}(\.\d{0,4})?)?"
                                        isInvalid={ isInvalid }
                                        errorText='Incorrect date'
                                    />
                                </div>
                                <div className="index__about-item">
                                    <FormInput
                                        label={ "Time of arrival" }
                                        placeholder={ "00:00" }
                                        value={ timeOfArrival }
                                        onChange={ handleSetTimeOfArrival }
                                        isInvalid={ isTimeInvalid }
                                        pattern="\d{0,2}(\:\d{0,2}?)?"
                                        errorText='Incorrect time'
                                    />
                                </div>
                                <div className="index__about-item">
                                    <FormInput
                                        label={ "Cargo weight (kg)" }
                                        placeholder={ "0" }
                                        isRequirement={ false }
                                        value={ cargoWeight }
                                        onChange={ (e) => setCargoWeight(e.target.value) }
                                        pattern="\d*"
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
                                        theme={ currentTheme }
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
                                    contact={ contact } 
                                    setContact={ setContact }
                                    onEditChange={ setIsEdit }
                                    isEditDef={ isEdit }
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
                                    theme={ currentTheme }
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
                            // isDisabled={ isOrder }
                            onClick={ handleChangeShowLeftBar }
                        />
                    </div>
                </div>
            </div>
            <div className={`index__footer ${isShowRightBar ? "index__footer--hidden" : ""}`}>
                <Footer 
                    theme={ currentTheme } 
                />
            </div>
        </>
    )
}

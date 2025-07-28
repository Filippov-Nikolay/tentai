import React, { useState, useEffect, useContext } from 'react';

import './styles/main.scss';
import './styles/adaptive.scss';

// TYPES
import { 
    Route, CargoSize
} from '../../types/index';

// VALIDATIONS
import { validateTime, validateDate } from './utils/validation';

// COMPONENTS
import Header from '../../shared/Components/Header/Header';
import RouteDetails from '../../shared/Components/RouteDetails/RouteDetails';
import ContactInfo from '../../shared/Components/ContactInfo/ContactInfo';
import Note from '../../shared/Components/Note/Note'
import SwitchBtn from '../../shared/Components/SwitchBtn/SwitchBtn';
import Order from '../../shared/Components/Order/Order';
import PrimaryBtn from '../../shared/Components/PrimaryBtn/PrimaryBtn';
import Footer from '../../shared/Components/Footer/Footer';
import SectionList from './components/SectionList/SectionList';
import FormWrapper from '../../shared/Components/FormFields/FormWrapper/FormWrapper';
import FormInputSize from '../../shared/Components/FormFields/FormInputSize/FormInputSize';

// COMPONENTS - FormFields
import FormInput from '../../shared/Components/FormFields/FormInput/FormInput'
import FormSelect from '../../shared/Components/FormFields/FormSelect/FormSelect';
import FormTextArea from '../../shared/Components/FormFields/FormTextArea/FormTextArea';

// HOOKS
import usePersistentState from './hooks/usePersistentState';
import useDebounce from './hooks/useDebounce';

// SERVICES
import { calculateDistances } from './services/apiService'

// ICONS
import { CalendarSVG, ArrowSVG, WalletSVG } from '../../shared/assets/svg/svgComponents';

// TOGGLE THEME
import { ThemeContext } from '../../App';

export default function Index({ theme='light' }) {
    // API
    const ORS_API_KEY = process.env.REACT_APP_API_KEY_ROUTE;

    // FOR CALCULATIONS
    const costPerKm = 10;               /* стоимость за 1 км */;
    const costPerHourLoading = 100;     /* стоимость времени работы (загрузка/разгрузка) за 1 час */
    const commissionRate = 0.3;         /* 30% комиссия */
    const forwardingServiceRate = 0.2;  /* 20% экспедиторские услуги от стоимости пути */

    // THEME
    const { isDarkMode, toggleTheme } = useContext(ThemeContext);
    const currentTheme = isDarkMode ? 'dark' : 'light';

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
    
    const isAllRoutesFilled = () => {
        return currentRoutes.every(route => route.inputValue.trim() !== '');
    };

    // Debounce route
    useDebounce(() => {
        const allInputEmpty = currentRoutes.every(route => !route.inputValue.trim());

        const total = currentRoutes.reduce((sum, r) => sum + (r.hoursValue || 0), 0);
        setHoursWorked(total);

        if (allInputEmpty) {
            const clearedRoutes = currentRoutes.map(route => ({
                ...route,
                distanceToNext: undefined
            }));
            localStorage.setItem('currentRoutes', JSON.stringify(clearedRoutes));

            setTotalDistanceKm(0);
            setFirstPoint('');
            setNameFirstPoint('');
            setLastPoint('');
            setNameLastPoint('');
            // setHoursWorked(0);

            return;
        }

        localStorage.setItem('currentRoutes', JSON.stringify(currentRoutes));

        

        const nonEmptyRoutes = currentRoutes.filter(route => route.inputValue?.trim());
        
        if (nonEmptyRoutes.length === 1) {
            const only = nonEmptyRoutes[0];
            const isFirst = only.point.toUpperCase() <= 'A';

            setFirstPoint(isFirst ? only.point : '');
            setNameFirstPoint(isFirst ? only.inputValue : '');
            setLastPoint(!isFirst ? only.point : '');
            setNameLastPoint(!isFirst ? only.inputValue : '');

            return;
        }

        const sortedRoutes = [...nonEmptyRoutes].sort((a, b) => a.point.localeCompare(b.point));

        const first = sortedRoutes[0];
        const last = sortedRoutes[sortedRoutes.length - 1];

        setFirstPoint(first.point || '');
        setNameFirstPoint(first.inputValue || '');
        setLastPoint(last.point || '');
        setNameLastPoint(last.inputValue || '');
    }, [currentRoutes], 0);


    useDebounce(() => {
        if (!isAllRoutesFilled()) { return; }

        calculateDistances(currentRoutes, setCurrentRoutes, String(ORS_API_KEY));
    }, [currentRoutes.map(route => route.inputValue).join('||')], 400);

    useDebounce(() => {
        const total = currentRoutes.reduce((sum, item) => 
            sum + (item.distanceToNext || 0), 0
        );
        setTotalDistanceKm(Number(total.toFixed(2)));
    }, [currentRoutes.map(route => route.distanceToNext).join('||')], 0);

    // ABOUT
    const[dateOfUpload, setDateOfUpload] = usePersistentState('dateOfUpload', '');
    const [timeOfArrival, setTimeOfArrival] = usePersistentState('timeOfArrival', '');
    const [cargoWeight, setCargoWeight] = usePersistentState('cargoWeight', '0');
    const [typeOfCargo, setTypeOfCargo] = usePersistentState('typeOfCargo', '');
    const [cargoSize, setCargoSize] = usePersistentState<CargoSize>('cargoSize', {
        length: '', weight: '', height: '', unit: ''
    });
    const [forwardingService, setForwardingService] = usePersistentState('forwardingService', false);

    // LEAVE A COMMENT
    const [inputComment, setInputComment] = usePersistentState('inputComment', '');

    // CONTACT INFORMATION
    const [contact, setContact] = usePersistentState('contact', {
        fullName: '', email: '', phoneNumber: ''
    });
    const [isEdit, setIsEdit] = usePersistentState('isEdit', false);

    const handleChange = () => {
        alert("Данные отправлены!");

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
                "forwardingService": forwardingService,
                "totalPrice": totalSum
            },
            {
                "title": "leaveComment",
                "comment": inputComment
            },
            {
                "title": "contactInformation",
                "contact": contact
            }
        ];

        console.log(result);
    }

    useEffect(() => {
        const newDistanceCost = Math.round(totalDistanceKm * costPerKm * 100) / 100;
        const newLoadingCost = Math.round(hoursWorked * costPerHourLoading * 100) / 100;
        const newForwardingCost = forwardingService ? Math.round(newDistanceCost * forwardingServiceRate * 100) / 100 : 0;
        const newCommissionCost = Math.round(newDistanceCost * commissionRate * 100) / 100;
        const newTotalSum = newDistanceCost + newLoadingCost + newForwardingCost + newCommissionCost;

        setDistanceCost(newDistanceCost);
        setLoadingCost(newLoadingCost);
        setForwardingServicesCost(newForwardingCost);
        setCommissionCost(newCommissionCost);
        setTotalSum(Number(newTotalSum.toFixed(2)));
    }, [totalDistanceKm, hoursWorked, costPerKm, costPerHourLoading, forwardingServiceRate, forwardingService, commissionRate]);

    const [isInvalid, setIsInvalid] = useState(false);
    const handleSetDateOfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setDateOfUpload(val);
        setIsInvalid(!validateDate(val));
    };

    const [isTimeInvalid, setIsTimeInvalid] = useState(false);
    const handleSetTimeOfArrival = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setTimeOfArrival(val);
        setIsTimeInvalid(!validateTime(val));
    };

    const [isDisabledSubmit, setIsDisabledSubmit] = useState(false);
    useEffect(() => {
        const allFilled = isAllRoutesFilled() && currentRoutes.every(route => 
            route.hoursValue !== null && 
            route.hoursValue !== undefined &&
            route.hoursValue > 0
        );

        if (
            dateOfUpload.length === 0 || 
            timeOfArrival.length === 0 || 
            !contact.fullName?.trim() ||
            contact.email.length === 0 ||
            contact.phoneNumber.length === 0 ||
            !allFilled || isInvalid || isTimeInvalid

        ) {
            setIsDisabledSubmit(true);
        } else {
            setIsDisabledSubmit(false);
        }
    }, [dateOfUpload, timeOfArrival, contact, currentRoutes]);

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
        const BREAKPOINT_RIGHT_BAR = 805;
        const BREAKPOINT_MENU = 990;

        const handleResize = () => {
            if (window.innerWidth > BREAKPOINT_RIGHT_BAR) {
                setIsShowRightBar(false);
            }
            if (window.innerWidth > BREAKPOINT_MENU) {
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
                value={ isOpen }
                theme={ currentTheme }
                onChange={ toggleMenu }
                onThemeChange={ toggleTheme }
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
                    <div className={`index__left-bar ${isShowRightBar ? "index__left-bar--hidden" : ""}`}>
                        <SectionList
                            theme={currentTheme}
                            sections={[
                                {
                                    title: "Route",
                                    content: (
                                        <RouteDetails
                                            theme={ currentTheme }
                                            routesData={ currentRoutes }
                                            onRoutesChange={ setCurrentRoutes }
                                        />
                                    )
                                },
                                {
                                    title: "About the cargo",
                                    content: (
                                        <FormWrapper
                                            theme={currentTheme}
                                            componentsInput={[
                                                <FormInput
                                                    theme={currentTheme}
                                                    label={ "Date of upload" }
                                                    placeholder={ "dd.mm.yyyy" }
                                                    iconSVG={ <CalendarSVG/> }
                                                    value={ dateOfUpload }
                                                    onChange={ handleSetDateOfUpload }
                                                    pattern="\d{0,2}(\.\d{0,2}(\.\d{0,4})?)?"
                                                    isInvalid={ isInvalid }
                                                    errorText='Incorrect date'
                                                />,
                                                <FormInput
                                                    theme={currentTheme}
                                                    label={ "Time of arrival" }
                                                    placeholder={ "00:00" }
                                                    value={ timeOfArrival }
                                                    onChange={ handleSetTimeOfArrival }
                                                    isInvalid={ isTimeInvalid }
                                                    pattern="\d{0,2}(\:\d{0,2}?)?"
                                                    errorText='Incorrect time'
                                                />,
                                                <FormInput
                                                    theme={currentTheme}
                                                    label={ "Cargo weight (kg)" }
                                                    placeholder={ "0" }
                                                    isRequirement={ false }
                                                    value={ cargoWeight }
                                                    onChange={ (e) => setCargoWeight(e.target.value) }
                                                    pattern="\d*"
                                                />,
                                                <FormSelect
                                                    theme={currentTheme}
                                                    label={ "Type of cargo" }
                                                    placeholder={ "Placeholder" }
                                                    isRequirement={ false }
                                                    iconSVG={ <ArrowSVG/> }
                                                    options={ ["test 1", "test 2", "test 3"] }
                                                    value={ typeOfCargo }
                                                    onChange={ (e) => setTypeOfCargo(e) }
                                                />,
                                                <FormInputSize
                                                    theme={currentTheme}
                                                    label={"Cargo size of the LWH (m)"}
                                                    componentsInput={[
                                                        <FormInput
                                                            placeholder={ "105" }
                                                            isRequirement={ false }
                                                            value={ cargoSize.length }
                                                            onChange={ (e) => setCargoSize(prev => ({ ...prev, length: e.target.value })) }
                                                        />,
                                                        <FormInput
                                                            placeholder={ "105" }
                                                            isRequirement={ false }
                                                            value={ cargoSize.weight }
                                                            onChange={ (e) => setCargoSize(prev => ({ ...prev, weight: e.target.value })) }
                                                        />,
                                                        <FormInput
                                                            placeholder={ "105" }
                                                            isRequirement={ false }
                                                            value={ cargoSize.height }
                                                            onChange={ (e) => setCargoSize(prev => ({ ...prev, height: e.target.value })) }
                                                        />
                                                    ]}
                                                    units={["cm", "mm", "dm"]}
                                                    value={ cargoSize.unit }
                                                    onChange={ (e: string) => setCargoSize(prev => ({ ...prev, unit: e })) }
                                                />,
                                                <SwitchBtn
                                                    theme={currentTheme}
                                                    label={"Forwarding service"}
                                                    onSwitch={ setForwardingService }
                                                    value={ forwardingService }               
                                                />
                                            ]}
                                        />
                                    )
                                },
                                {
                                    title: "Leave a comment",
                                    content: (
                                        <FormTextArea
                                            theme={ currentTheme }
                                            onChange={ (e) => setInputComment(e.target.value) }
                                            value={ inputComment }
                                        />
                                    )
                                },
                                {
                                    title: "Contact information",
                                    content: (
                                        <ContactInfo
                                            contact={ contact } 
                                            setContact={ setContact }
                                            onEditChange={ setIsEdit }
                                            isEditDef={ isEdit }
                                        />
                                    )
                                },
                                {
                                    title: "Payment",
                                    content: (
                                        <Note
                                            theme={ currentTheme }
                                            component={ <WalletSVG/> }
                                            title={ "Payment on receipt" }
                                            text={ "Avoid online transactions and pay only when you receive your order. This will guarantee your financial security and avoid any risks associated with electronic payments." }
                                        />
                                    )
                                }
                            ]}
                        />
                    </div>
                    <div className={`index__right-bar ${isShowRightBar ? "index__right-bar--show" : ""}`}>
                        <SectionList
                            theme = {currentTheme}
                            sections={[
                                {
                                    title: "Order",
                                    content: (
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
                                            timeArrival={ !isTimeInvalid ? timeOfArrival : '' }

                                            component = {
                                                <ContactInfo
                                                    contact={ contact } 
                                                    setContact={ setContact }
                                                    onEditChange={ setIsEdit }
                                                    isEditDef={ false }
                                                />
                                            }

                                            loadingAndUploadingPrice={ loadingCost }
                                            payment={ distanceCost }
                                            forwardingService={ forwardingServicesCost }
                                            serviceCommission={ commissionCost }
                                            totalPrice={ totalSum }

                                            isDisabled={ isDisabledSubmit }

                                            onClick={ handleChange }
                                        />
                                    )
                                }
                            ]}
                        />
                    </div>
                    <div className={`index__primary-btn ${isShowRightBar ? "index__primary-btn--hidden" : ""}`}>
                        <PrimaryBtn
                            text={ "Continue" }
                            isDisabled={ isDisabledSubmit }
                            onClick={ handleChangeShowLeftBar }
                        />
                    </div>
                </div>
            </div>
            <div className={`index__footer ${isShowRightBar ? "index__footer--hidden" : ""}`}>
                <Footer theme={ currentTheme } />
            </div>
        </>
    )
}

import React, { useState } from 'react';

import './routeDetails.css';
import './adaptive.css';

import { MapSVG, TrashSVG } from '../../assets/svg/svgComponents'

// COMPONENTS - FormFields
import FormInput from '../FormFields/FormInput/FormInput';

// SERVICES
import { geocodeAddress, calculateORSMatrix } from '../../../pages/Checkout/services/apiService'

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export default function RouteDetails({ theme='light', onRoutesChange }) {
    const currentTheme = theme === 'dark' ? 'dark' : 'light';

    const [routes, setRoutes] = useState([
        { title: 'Download location', point: 'A', isTrash: false, inputValue: '', hoursValue: '', distanceToNext: null },
        { title: 'Place of unloading', point: 'B', isTrash: false, inputValue: '', hoursValue: '', distanceToNext: null },
    ]);

    const [shouldRecalculate, setShouldRecalculate] = useState(false);

    const handleChange = (index, field, value) => {
        setRoutes(prev => {
            const newRoutes = [...prev];
            newRoutes[index][field] = value;
            return newRoutes;
        });
    };

    const addRoute = () => {
        const newRoutes = [...routes];
        const nextIndex = newRoutes.length;
        const nextLetter = alphabet[nextIndex];

        newRoutes.push({
            title: `Custom point`,
            point: nextLetter,
            isTrash: true,
            inputValue: '',
            hoursValue: '',
            distanceToNext: null
        });

        setRoutes(newRoutes);
        setShouldRecalculate(true);

        console.log(routes);
    };
    React.useEffect(() => {
        if (shouldRecalculate) {
            calculateDistances();
            setShouldRecalculate(false);
        }
    }, [shouldRecalculate]);


    const deleteRoute = (index) => {
        const baseRoutes = routes.slice(0, 2);
        const extraRoutes = routes.slice(2);

        const newExtras = extraRoutes.filter((_, i) => i + 2 !== index);

        const reindexedExtras = newExtras.map((item, idx) => ({
            ...item,
            point: alphabet[idx + 2],
        }));

        const updatedRoutes = [...baseRoutes, ...reindexedExtras];
        setRoutes(updatedRoutes);
        setShouldRecalculate(true);
    };

    React.useEffect(() => {
        if (shouldRecalculate) {
            calculateDistances();
            setShouldRecalculate(false);
        }
    }, [shouldRecalculate]);

    const isLimitReached = routes.length >= alphabet.length;

    const ORS_API_KEY = process.env.API_KEY_ROUTE;
    const calculateDistances = async () => {
    try {
        const addresses = routes.map(r => r.inputValue).filter(Boolean);

        const coords = await Promise.all(addresses.map(addr => geocodeAddress(addr, ORS_API_KEY)));

        const matrix = await calculateORSMatrix(coords, ORS_API_KEY);

        const updatedRoutes = [...routes];

        for (let i = 0; i < coords.length - 1; i++) {
            const distance = matrix.distances[i][i + 1];
            updatedRoutes[i].distanceToNext = distance.toFixed(2); // сохраняем как строку, чтобы было удобно отобразить
        }

        // Последней точке обнуляем distanceToNext
        if (updatedRoutes.length > 0) {
            updatedRoutes[updatedRoutes.length - 1].distanceToNext = null;
        }

        setRoutes(updatedRoutes);
        onRoutesChange?.(updatedRoutes);
        } catch (error) {
            console.error("Ошибка при расчёте маршрута:", error);
        }
    };


    return (
        <div className={`route-details ${ currentTheme }`}>
            <div className="route-details__list">
                {routes.map((item, index) => (
                    <div className="route-details__item" key={ index }>
                        <div className="route-details__wrapper">
                            <h2 className="route-details__title">{ item.title }</h2>
                            { item.isTrash && <button type="button" className="route-details__btn-trash" onClick={ () => deleteRoute(index) }><TrashSVG/></button> }
                        </div>
                        <div className="route-details__main">
                            <div className="route-details__left-item">
                                <FormInput
                                    label={ `Point ${item.point}` }
                                    placeholder={ "Thailand, Phuket, Rat Burana.." }
                                    iconSVG={ <MapSVG/> }
                                    value={ item.inputValue }
                                    onChange={(e) => handleChange(index, 'inputValue', e.target.value)}
                                />
                            </div>
                            <div className="route-details__right-item">
                                <FormInput
                                    label={ `Operating time (hour)` }
                                    placeholder={ "Enter hour" }
                                    value={ item.hoursValue }
                                    onChange={(e) => handleChange(index, 'hoursValue', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="route-details__btn-add-wrapper">
                <button 
                    type="button" 
                    onClick={ addRoute }
                    className={`route-details__btn-add ${isLimitReached ? 'route-details__btn-add--disabled' : ''}`}
                >+ Add another point</button>
            </div>
        </div>
    )
}

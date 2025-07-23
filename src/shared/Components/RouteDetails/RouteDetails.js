import React, { useState } from 'react';

import './routeDetails.css';
import './adaptive.css';

import { MapSVG, TrashSVG } from '../../assets/svg/svgComponents'

// COMPONENTS - FormFields
import FormInput from '../FormFields/FormInput/FormInput';

// SERVICES
import { geocodeAddress, calculateORSMatrix } from '../../../pages/Checkout/services/apiService'

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export default function RouteDetails({ theme='light' }) {
    const currentTheme = theme === 'dark' ? 'dark' : 'light';

    const [routes, setRoutes] = useState([
        { title: 'Download location', point: 'A', isTrash: false, inputValue: '', hoursValue: '' },
        { title: 'Place of unloading', point: 'B', isTrash: false, inputValue: '', hoursValue: '' },
    ]);

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
            isTrash: true
        });
        setRoutes(newRoutes);
        calculateDistances();
    };

    const deleteRoute = (index) => {
        const baseRoutes = routes.slice(0, 2);
        const extraRoutes = routes.slice(2);

        const newExtras = extraRoutes.filter((_, i) => i + 2 !== index);

        const reindexedExtras = newExtras.map((item, idx) => ({
            ...item,
            point: alphabet[idx + 2], // начиная с C
        }));

        setRoutes([...baseRoutes, ...reindexedExtras]);
    };

    const isLimitReached = routes.length >= alphabet.length;

    const ORS_API_KEY = 'eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6ImRjZGQxMzgwZjg2MDQ2N2M4YWFmNTM2YTQwOTliZTJmIiwiaCI6Im11cm11cjY0In0=';
    const calculateDistances = async () => {
        try {
            const addresses = routes.map(r => r.inputValue).filter(Boolean);

            // Геокодинг адресов
            const coords = await Promise.all(addresses.map(addr => geocodeAddress(addr, ORS_API_KEY)));

            // Расчёт расстояний
            const matrix = await calculateORSMatrix(coords, ORS_API_KEY);

            for (let i = 0; i < coords.length - 1; i++) {
                const from = alphabet[i];
                const to = alphabet[i + 1];
                const distance = matrix.distances[i][i + 1]; // в километрах

                // From A to B: 461.97 km
                // From B to C: 12461.81 km
                console.log(`From ${from} to ${to}: ${distance.toFixed(2)} km`);
            }

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

import React, { useState, useEffect, useRef } from 'react';

import './routeDetails.scss';
import './adaptive.scss';

import { MapSVG, TrashSVG } from '../../assets/svg/svgComponents'

// COMPONENTS - FormFields
import FormInput from '../FormFields/FormInput/FormInput';

// SERVICES
import { geocodeAddress, calculateORSMatrix } from '../../../pages/Checkout/services/apiService'

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

type Route = {
    title: string;
    point: string;
    isTrash: boolean;
    inputValue: string;
    hoursValue: number;
    distanceToNext: number | null;
}

type RouteDetailsType = {
    theme?: 'light' | 'dark';
    routesData: Route[];
    onRoutesChange: (newRoutes: Route[]) => void;
}

export default function RouteDetails({ 
    theme='light', 
    routesData,
    onRoutesChange,
}: RouteDetailsType) {
    const [routes, setRoutes] = useState(routesData);
    const [shouldRecalculate, setShouldRecalculate] = useState(false);

    React.useEffect(() => {
        setRoutes(routesData);
    }, [routesData]);

    const handleChange = (index: number, field: 'inputValue' | 'hoursValue', value: string) => {
        setRoutes(prev => {
            const newRoutes = [...prev];
            newRoutes[index] = {
                ...newRoutes[index],
                [field]: field === 'hoursValue' ? Number(value) : value,
            }
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
            hoursValue: 0,
            distanceToNext: 0.0
        });

        setRoutes(newRoutes);
        setShouldRecalculate(true);
    };
    React.useEffect(() => {
        if (shouldRecalculate) {
            calculateDistances();
            setShouldRecalculate(false);
        }
    }, [shouldRecalculate]);


    const deleteRoute = (index: number) => {
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
    
    const ORS_API_KEY = process.env.REACT_APP_API_KEY_ROUTE;

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
            updatedRoutes[updatedRoutes.length - 1].distanceToNext = -1;
        }

        setRoutes(updatedRoutes);
        onRoutesChange?.(updatedRoutes);
        } catch (error) {
            console.error("Ошибка при расчёте маршрута:", error);
        }
    };

    const debounceTimer = useRef<number | null>(null);
    useEffect(() => {
        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }

        const allFilled = routes.every(route => 
            route.inputValue.trim() !== '' && 
            route.hoursValue !== null && 
            route.hoursValue !== undefined
        );

        if (!allFilled) {
            return;
        }

        debounceTimer.current = window.setTimeout(() => {
            calculateDistances();
        }, 2000);

        return () => {
            if (debounceTimer.current !== null) {
                clearTimeout(debounceTimer.current);
            }
        };
    }, [routes]);

    return (
        <div className={`route-details ${ theme }`}>
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
                                    pattern="[A-Za-zА-Яа-я]*"
                                />
                            </div>
                            <div className="route-details__right-item">
                                <FormInput
                                    label={ `Operating time (hour)` }
                                    placeholder={ "Enter hour" }
                                    value={ String(item.hoursValue) }
                                    onChange={(e) => handleChange(index, 'hoursValue', e.target.value)}
                                    pattern="\d*"
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

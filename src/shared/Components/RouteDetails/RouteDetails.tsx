import React, { useState, useEffect, useRef } from 'react';

import './routeDetails.scss';
import './adaptive.scss';

import { MapSVG, TrashSVG } from '../../assets/svg/svgComponents'

// COMPONENTS - FormFields
import FormInput from '../FormFields/FormInput/FormInput';

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
    const isLimitReached = routesData.length >= alphabet.length;

    const addRoute = () => {
        const nextPoint = alphabet[routesData.length] || '?';

        const newRoutes = [
            ...routesData,
            { title: 'Download location', point: `${nextPoint}`, isTrash: true, inputValue: '', hoursValue: 0, distanceToNext: null }
        ];

        onRoutesChange?.(newRoutes);
    }

    const deleteRoute = (index: number) => {
        let newRoutes = routesData.filter((_, i) => i !== index);

        newRoutes = newRoutes.map((route, i) => ({
            ...route,
            point: alphabet[i] || '?'
        }));

        onRoutesChange?.(newRoutes);
    }

    const handleChange = (index: number, key: 'inputValue' | 'hoursValue', value: string) => {
        const newRoutes = [...routesData];
        const updateItem = { ...newRoutes[index] };

        if (key === 'hoursValue') { updateItem.hoursValue = Number(value); } 
        else { updateItem.inputValue = value; }
        newRoutes[index] = updateItem;

        onRoutesChange?.(newRoutes);
    }
    
    return (
        <div className={`route-details ${ theme }`}>
            <div className="route-details__list">
                {routesData.map((item, index) => (
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
                                    pattern="[A-Za-zА-Яа-яЁё0-9\s,.-]*"
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

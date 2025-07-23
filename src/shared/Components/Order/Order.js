import React from 'react';

import './order.css';
import './adaptive.css';

import tempImg from '../../assets/img/image.png'

import { LocationSVG, RatingSVG } from '../../assets/svg/svgComponents';

import Note from '../Note/Note';
import PrimaryBtn from '../PrimaryBtn/PrimaryBtn';
import CheckboxBtn from '../CheckboxBtn/CheckboxBtn';

export default function Order({
    srcImg = tempImg,
    title = "Ecological cleaning and maintenance services for home",
    currency = "THB",
    payment = 6300,
    location = "Bangkok",
    rating = 5.0,
    bannerText = "top seller"
}) {
    return (
        <div className="order">
            <div className="order__top">
                <div className="order__top-wrapper">
                    <div className="order__img-wrapper">
                        <img src={ srcImg } alt="" className="order__img" />
                        <div className="order__img-banner">{ bannerText }</div>
                    </div>
                    <div className="order__right-item-wrapper">
                        <div className="order__right-item-top">
                            <h3 className="order__title">{ title }</h3>
                            <div className="order__payment">
                                <span className="order__payment-price">{ payment }</span>
                                <span className="order__payment-currency">{ currency }</span>
                            </div>
                        </div>
                        <div className="order__right-item-bottom">
                            <div className="order__right-info">
                                <span className="order__right-info-svg"><LocationSVG/></span>
                                <span className="order__right-info-text">{ location }</span>
                            </div>
                            <div className="order__right-info">
                                <span className="order__right-info-svg"><RatingSVG/></span>
                                <span className="order__right-info-text order__right-info-text--bold">{ rating }</span>
                            </div>
                        </div>
                    </div>
                </div>
                <ul className="order__point-list">
                    <li className="order__point-list-item">
                        <span className="order__point">Point A</span>
                        <span className="order__path">Thailand, Phuket, Rat Burana, 10:00 PM</span>
                    </li>
                    <li className="order__point-list-item">
                        <span className="order__point">Point B</span>
                        <span className="order__path">Thailand, Phuket, Burana Rat, 21:00 PM</span>
                    </li>
                </ul>
            </div>
            <div className="order__list">
                <div className="order__list-item">
                    <span className="order__price-name">Loading and unloading route</span>
                    <div className="order__list-item-wrapper">
                        <span className="order__price-value">{ 200 }</span>
                        <span className="order__list-currency">{ currency }</span>
                    </div>
                </div>
                <div className="order__list-item">
                    <span className="order__price-name">Forwarding services</span>
                    <div className="order__list-item-wrapper">
                        <span className="order__price-value">{ 200 }</span>
                        <span className="order__list-currency">{ currency }</span>
                    </div>
                </div>
                <div className="order__list-item">
                    <span className="order__price-name">Payment</span>
                    <div className="order__list-item-wrapper">
                        <span className="order__price-value">{ 200 }</span>
                        <span className="order__list-currency">{ currency }</span>
                    </div>
                </div>
                <div className="order__list-item">
                    <span className="order__price-name">Service commission</span>
                    <div className="order__list-item-wrapper">
                        <span className="order__price-value">{ 200 }</span>
                        <span className="order__list-currency">{ currency }</span>
                    </div>
                </div>
                <span className="order__list-item--decor"></span>
                <div className="order__list-item order__list-item--total">
                    <span className="order__price-name order__price-name--total">Total price</span>
                    <div className="order__list-item-wrapper order__list-item-wrapper--total">
                        <span className="order__price-value order__price-value--total">{ 200 }</span>
                        <span className="order__list-currency order__list-currency--total">{ currency }</span>
                    </div>
                </div>
            </div>
            <div className="order__alternative">
                <Note
                    component={ <CheckboxBtn/> }
                    title={ "Alternative price" }
                    text={ "Set your price for a service or product and find the best deal for your budget." }
                />
            </div>
            <div className="order__primary-btn">
                <PrimaryBtn
                    text={ "Order" }
                    isDisabled={ true }
                />
            </div>
        </div>
    )
}

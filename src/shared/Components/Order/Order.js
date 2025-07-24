import React from 'react';

import './order.scss';
import './adaptive.scss';

import tempImg from '../../assets/img/image.png'

import { LocationSVG, RatingSVG } from '../../assets/svg/svgComponents';

import Note from '../Note/Note';
import PrimaryBtn from '../PrimaryBtn/PrimaryBtn';
import CheckboxBtn from '../CheckboxBtn/CheckboxBtn';

export default function Order({
    srcImg = tempImg,
    title = "",
    currency = "",
    location = "",
    rating = 0,
    bannerText = "",

    firstPoint = "",
    lastPoint = "",
    nameFirstPoint = "",
    nameLastPoint = "",

    loadingAndUploadingPrice = 0,
    forwardingService = 0,
    payment = 0,
    serviceCommission = 0,
    totalPrice = 0,

    isDisabled = false,
    onClick,
}) {
    return (
        <div className="order">
            <div className="order__top">
                <div className="order__top-wrapper">
                    <div className="order__img-wrapper">
                        <img src={ srcImg } alt="" className="order__img" />
                        {bannerText && <div className="order__img-banner">{ bannerText }</div>}
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
                        <span className="order__point">Point { firstPoint }</span>
                        <span className="order__path">{ nameFirstPoint }</span>
                    </li>
                    <li className="order__point-list-item">
                        <span className="order__point">Point { lastPoint }</span>
                        <span className="order__path">{ nameLastPoint }</span>
                    </li>
                </ul>
            </div>
            <div className="order__list">
                <div className="order__list-item">
                    <span className="order__price-name">Loading and unloading route</span>
                    <div className="order__list-item-wrapper">
                        <span className="order__price-value">{ loadingAndUploadingPrice }</span>
                        <span className="order__list-currency">{ currency }</span>
                    </div>
                </div>
                <div className="order__list-item">
                    <span className="order__price-name">Forwarding services</span>
                    <div className="order__list-item-wrapper">
                        <span className="order__price-value">{ forwardingService }</span>
                        <span className="order__list-currency">{ currency }</span>
                    </div>
                </div>
                <div className="order__list-item">
                    <span className="order__price-name">Payment</span>
                    <div className="order__list-item-wrapper">
                        <span className="order__price-value">{ payment }</span>
                        <span className="order__list-currency">{ currency }</span>
                    </div>
                </div>
                <div className="order__list-item">
                    <span className="order__price-name">Service commission</span>
                    <div className="order__list-item-wrapper">
                        <span className="order__price-value">{ serviceCommission }</span>
                        <span className="order__list-currency">{ currency }</span>
                    </div>
                </div>
                <span className="order__list-item--decor"></span>
                <div className="order__list-item order__list-item--total">
                    <span className="order__price-name order__price-name--total">Total price</span>
                    <div className="order__list-item-wrapper order__list-item-wrapper--total">
                        <span className="order__price-value order__price-value--total">{ totalPrice }</span>
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
                    isDisabled={ isDisabled }
                    onClick={ onClick }
                />
            </div>
        </div>
    )
}

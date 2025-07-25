import React, { useState } from 'react';

import './header.scss';
import './adaptive.scss';

import logo from '../../assets/img/Logo.png'
import avatar from '../../assets/img/avatar.jpg'

import { 
    AllCategoriesSVG, SearchSVG, PresentSVG, 
    MessagesSVG, NotificationSVG, PlusSVG,
    HexagonPolygonSVG 
} from '../../assets/svg/svgComponents';

// COMPONENTS
import Notification from '../Notification/Notification';
import MenuBurger from '../MenuBurger/MenuBurger';
import PrimaryBtn from '../PrimaryBtn/PrimaryBtn';

export default function Header({ theme='light', onChange, value }) {
    const currentTheme = theme === 'dark' ? 'dark' : 'light';

    let isOpen = value;

    return (
        <header className={`header ${currentTheme}`}>
            <div className='container'>
                <div className="header__wrapper">
                    {/* 
                        Сделать компонентом, который будет адаптироваться 
                        под размер обёртки
                    */}
                    <div className="header__logo">
                        <a href="#" className="logo"><img src={ logo } alt="logo tentai" className="logo__img" /></a>
                    </div>
                    <div className="header__btn-categories">
                        <button className="btn-categories">
                            <span className="btn-categories__svg"><AllCategoriesSVG/></span>
                            <span className="btn-categories__text">All categories</span>
                        </button>
                    </div>
                    <div className="header__search">
                        <form action="#" method="GET" className="search-form">
                            <div className="search-form__wrapper">
                                <div className="search-form__svg">
                                    <SearchSVG/>
                                </div>
                                <input type="text" name="" id="" className="search-form__input" placeholder="Search in Tentai" />
                            </div>
                        </form>
                    </div>
                    <div className="header__menu-burger">
                        <MenuBurger
                            theme= { currentTheme }
                            onClick={ onChange }
                        />
                    </div>
                    
                    <div className={`header__right-bar ${isOpen ? "header__right-bar--active" : ""}`}>
                        <div className="header__prizes">
                            <a href="#" className="prizes">
                                <div className="prizes__svg">
                                    <PresentSVG/>
                                </div>
                                <p className="prizes__text">Give prizes</p>
                            </a>
                        </div>
                        <div className="header__notification">
                            <Notification
                                icon={ <MessagesSVG/> }
                                number={ "99+" }
                            />
                        </div>
                        <div className="header__notification">
                            <Notification
                                icon={ <NotificationSVG/> }
                                number={ "99+" }
                            />
                        </div>
                        <div className="header__profile">
                            <a href="#" className="profile">
                                <HexagonPolygonSVG 
                                    src={ avatar }
                                />
                            </a>
                        </div>
                        <div className="header__btn-offer">
                            <PrimaryBtn
                                iconSvg={ <PlusSVG/> }
                                text={ "Add offer" }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

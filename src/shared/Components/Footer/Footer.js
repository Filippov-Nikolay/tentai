import React from 'react';

import './footer.scss';
import './adaptive.scss';

import logo from '../../assets/img/Logo-main.png'

import { 
    ArrowSVG,
    EmailSVG, PhoneSVG,
    InstagramLogoSVG, FacebookLogoSVG, TelegramLogoSVG,
    YoutubeLogoSVG, LineLogoSVG, AppleLogoSVG,
    GoogleplayLogoSVG, HuaweishopLogoSVG
} from '../../assets/svg/svgComponents';

import FormSelect from '../FormFields/FormSelect/FormSelect';

export default function Footer({

}) {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer__wrapper-content">
                    <div className="footer__left-content">
                        <div className="footer__item">
                            <div className="footer__img-wrapper">
                                <a href="#" className="footer__logo-link">
                                    <img src={ logo } alt="logo" className="footer__img" />
                                </a>
                            </div>
                            <p className="footer__copyright">
                                © 2024 Tentai – Find it. Choose. Make life more convenient. 
                            </p>
                        </div>
                        <div className="footer__item">
                            <div className="footer__item-wrapper">
                                <h3 className="footer__title">Documents</h3>
                                <ul className="footer__list">
                                    <li className="footer__list-item">
                                        <a href="#" className="footer__list-link">Privacy Policy</a>
                                    </li>
                                    <li className="footer__item">
                                        <a href="#" className="footer__list-link">User agreement</a>
                                    </li>
                                    <li className="footer__item">
                                        <a href="#" className="footer__list-link">More documents</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="footer__item">
                            <div className="footer__item-wrapper">
                                <h3 className="footer__title">Contacts</h3>
                                <ul className="footer__list">
                                    <li className="footer__list-item">
                                        <a href="mailto:example@mail.com" className="footer__list-link">
                                            <span className="footer__list-link-svg">{ <EmailSVG/> }</span>
                                            <span className="footer__list-link-text">example@mail.com</span>
                                        </a>
                                    </li>
                                    <li className="footer__item">
                                        <a href="tel:+66123456789" className="footer__list-link">
                                            <span className="footer__list-link-svg">{ <PhoneSVG/> }</span>
                                            <span className="footer__list-link-text">+66123456789</span>
                                        </a>
                                    </li>
                                </ul>
                                <ul className="footer__social-list">
                                    <li className="footer__social-item">
                                        <a href="#" className="footer__social-link"><InstagramLogoSVG/></a>
                                    </li>
                                    <li className="footer__social-item">
                                        <a href="#" className="footer__social-link"><FacebookLogoSVG/></a>
                                    </li>
                                    <li className="footer__social-item">
                                        <a href="#" className="footer__social-link"><TelegramLogoSVG/></a>
                                    </li>
                                    <li className="footer__social-item">
                                        <a href="#" className="footer__social-link"><YoutubeLogoSVG/></a>
                                    </li>
                                    <li className="footer__social-item">
                                        <a href="#" className="footer__social-link"><LineLogoSVG/></a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="footer__item">
                            <div className="footer__item-wrapper">
                                <h3 className="footer__title">Download Tentai App</h3>
                                <ul className="footer__social-list">
                                    <li className="footer__social-item">
                                        <a href="#" className="footer__social-link footer__social-link--big-icon"><AppleLogoSVG/></a>
                                    </li>
                                    <li className="footer__social-item">
                                        <a href="#" className="footer__social-link footer__social-link--big-icon"><GoogleplayLogoSVG/></a>
                                    </li>
                                    <li className="footer__social-item">
                                        <a href="#" className="footer__social-link footer__social-link--big-icon"><HuaweishopLogoSVG/></a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="footer__right-content footer__right-content--select">
                        <FormSelect
                            iconSVG={ <ArrowSVG/> }
                            isRequirement={ false }
                            options={ ["English", "Spanish"] }
                            defaultOptionIndex={ 0 }
                            isInput={ false }
                        />
                    </div>
                </div>
            </div>
        </footer>
    )
}

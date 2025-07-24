import React from 'react';

import './subTitle.scss';
import './adaptive.scss';

import { LogoForTitleSVG } from '../../assets/svg/svgComponents'

export default function SubTitle({ text }) {
    return (
        <h2 className="sub-title">
            <span className="sub-title__svg"><LogoForTitleSVG/></span>
            <span className="sub-title__text">{ text }</span>
        </h2>
    )
}

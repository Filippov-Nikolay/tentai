import React from 'react';

import './styles/main.css';

// COMPONENTS
import Header from '../../shared/Components/Header/Header';
import RouteDetails from '../../shared/Components/RouteDetails/RouteDetails';
import SubTitle from '../../shared/Components/SubTitle/SubTitle'

export default function Index({ theme='light' }) {
    const currentTheme = theme === 'dark' ? 'dark' : 'light';

    return (
        <>
            <div className="index__header">
                <Header 
                    theme={ currentTheme }
                />
            </div>
            <div className="container">
                <h1 className="index__title">Checkout</h1>
                <section className="index__section">
                    <div className="index__sub-title">
                        <SubTitle 
                            text={ "Route" }
                        />
                    </div>
                    <div className="index__route-details">
                        <RouteDetails
                            title={ "Download location" }
                            point={ "A" }
                            theme={ currentTheme }
                        />
                    </div>
                </section>
                <section className="index__section">
                    <div className="index__sub-title">
                        <SubTitle 
                            text={ "About the cargo" }
                        />
                    </div>
                    <div className="index__route-details">
                        
                    </div>
                </section>
            </div>
        </>
    )
}

import React from 'react';

// COMPONENTS
import SubTitle from '../../../../shared/Components/SubTitle/SubTitle';

import './sectionList.scss';
import './adaptive.scss';

type SectionListProps = {
    theme?: 'light' | 'dark';
    sections: {
        title: string;
        content: React.ReactNode;
    }[];
};

export default function SectionList({
    theme = 'light',
    sections
}: SectionListProps) {
    return (
        <div className={`section-list ${theme}`}>
            {sections && sections.map((item, index) => (
                <section className="section-list__section" key={index}>
                    <div className="section-list__sub-title">
                        <SubTitle text={ item.title } />
                    </div>
                    <div className="section-list__content">{item.content}</div>
                </section>
            ))}
        </div>
    )
}

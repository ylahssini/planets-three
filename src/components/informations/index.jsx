import React from 'react';
import { useStore } from '../../store';
import './styles.scss';

const selector = ({ loading, target, sun, planets }) => ({ loading, target, sun, planets });

function formatRotationSpeed(rotationSpeed) {
    const translateFormat = {
        d: 'يوم',
        h: 'ساعة',
        m: 'دقيقة',
    };

    return Object.keys(rotationSpeed).reduce((acc, curr) => {
        let str = '';

        if (rotationSpeed[curr] !== 0) {
            str = `${rotationSpeed[curr]} ${translateFormat[curr]},`;
        }

        return `${acc} ${str}`;
    }, '').trim().replace(/,$/g, '');
}

const Informations = () => {
    const { loading, target, sun, planets } = useStore(selector);

    if (loading) {
        return null;
    }

    let definition;
    if (target === '') {
        definition = sun;
    } else {
        definition = planets[target];
    }

    const { title, description: { color, orbitSpeed, rotationSpeed, content, url } } = definition;

    return (
        <article className="definition">
            <h2 className="definition-title" style={{ color }}>
                <span>{title.en}</span>
                <bdo dir="rtl">{title.ar}</bdo>
            </h2>
            <p className="definition-content">
                {content}<br />
                <a href={url} target="_blank" rel="noreferrer noopener" className="definition-url">المصدر ويكيبيديا</a>
            </p>
            <footer className="definition-footer">
                {orbitSpeed && <div><span>سرعة المدار</span>:<br /> <strong>{orbitSpeed} كيلومتر في ثانية</strong></div>}
                <div><span>مدة الدوران</span>:<br /> <strong>{formatRotationSpeed(rotationSpeed)}</strong></div>
            </footer>
        </article>
    );
};

export default Informations;

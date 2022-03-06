import React, { useMemo } from 'react';
import Select from './select';
import { useStore } from '../../store';

const selector = ({ loading, setCamera }) => ({ loading, setCamera });

const planetsLabel = {
    mercury: 'عطارد',
    venus: 'الزهرة',
    earth: 'الأرض',
    mars: 'المريخ',
    jupiter: 'المشتري',
    saturn: 'زحل',
};

const Header = () => {
    const { loading, setCamera } = useStore(selector);

    const planets = useMemo(() => (
        Object.entries(planetsLabel).map(([value, label]) => ({ value, label }))
    ), []);

    function handleChange(item) {
        setCamera(item.value);
    }

    if (!loading) {
        return (
            <header>
                <h1>النظام الشمسي</h1>
                { /* <Select
                    data={planets}
                    isRtl
                    placeholder="حدد الكوكب"
                    handleChange={handleChange}
                /> */ }
            </header>
        );
    }

    return null;
}

export default Header;

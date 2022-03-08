import React, { useMemo } from 'react';
import Select from './select';
import { useStore } from '../../store';

const selector = ({ loading, planets, setTarget }) => ({ loading, planets, setTarget });

const Header = () => {
    const { loading, planets, setTarget } = useStore(selector);

    const data = useMemo(() => (
        Object.entries(planets).map(([value, planet]) => ({ value, label: planet.title.ar }))
    ), []);

    function handleChange(item) {
        setTarget(item.value);
    }

    if (!loading) {
        return (
            <header>
                <h1>النظام الشمسي</h1>
                <Select
                    data={data}
                    isRtl
                    placeholder="حدد الكوكب"
                    handleChange={handleChange}
                />
            </header>
        );
    }

    return null;
}

export default Header;

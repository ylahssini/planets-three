import React, { useMemo } from 'react';
import Select from './select';
import Swicth from './switch';
import { useStore } from '../../store';
import './styles.scss';

const selector = ({ loading, planets, free_mode, target, setFreeMode, setTarget }) => ({
    loading, planets, free_mode, target, setFreeMode, setTarget,
});

const Header = () => {
    const { loading, planets, free_mode, target, setFreeMode, setTarget } = useStore(selector);

    const data = useMemo(() => (
        Object.entries(planets).map(([value, planet]) => ({ value, label: planet.title.ar }))
    ), []);

    function handleSelect(item) {
        setTarget(item.value);
    }

    function handleSwitch(value) {
        setFreeMode(value);
    }

    if (!loading) {
        return (
            <header>
                <h1>النظام الشمسي</h1>
                <aside className="side">
                    <Swicth
                        handleChange={handleSwitch}
                        checked={free_mode}
                        label="وضع حر"
                        disabled={target !== ''}
                    />
                    <Select
                        data={data}
                        isRtl
                        disabled={free_mode}
                        placeholder="حدد"
                        handleChange={handleSelect}
                    />
                </aside>
            </header>
        );
    }

    return null;
};

export default Header;

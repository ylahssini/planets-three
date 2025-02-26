import React, { useMemo } from 'react';
import Select from './select';
import Swicth from './switch';
import { useStore } from '@src/store';
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
                <h1 className="title">
                    النظام الشمسي
                    <small>من تصميم <a href="https://ylahssini.vercel.app" target="_blank" rel="noreferrer">يوسف الحسيني</a></small>
                </h1>

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
                        placeholder="الشمس"
                        handleChange={handleSelect}
                    />
                </aside>
            </header>
        );
    }

    return null;
};

export default Header;

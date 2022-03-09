import React from 'react';
import './styles.scss';

const Swicth = ({ label = '', checked = false, disabled = false, handleChange }) => {
    function handleSwitch(e) {
        handleChange(e.target.checked);
    }

    return (
        <label className={`switch ${disabled ? '__disabled' : ''} ${checked ? '__checked' : ''}`}>
            <input type="checkbox" checked={checked} onChange={handleSwitch} disabled={disabled} />
            <span />
            <strong>{label}</strong>
        </label>
    );
};

export default Swicth;

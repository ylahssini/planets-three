import React from 'react';

const Tooltip = ({ show, handleHide, title, description }) => {
    return (
        <article className="tooltip" hidden={!show}>
            <h4 className="tooltip-title">{title}</h4>
            <p className="tooltip-description">{description}</p>
            <button className="tooltip-button" type="button" onClick={handleHide}>إغلاق</button>
        </article>
    )
};

export default Tooltip;

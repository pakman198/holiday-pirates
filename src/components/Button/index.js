import React from 'react';

const Button = (props) => {

    const clickHandler = (e) => {
        e.preventDefault();
        props.fetchHotels();
    }
    
    return (
        <button id="loadHotels" onClick={clickHandler} className="btn btn-secondary">Load Hotels</button>
    );
    
}

export default Button;
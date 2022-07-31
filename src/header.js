import React from 'react';

import './index.css';


const Header = (props) =>  {

    const {usdToShow, eurToShow} = props

    const render = () => {
        if (usdToShow && eurToShow){
            return (
            <ul className="slider-menu">
                <li>USD: {usdToShow.UAH.toFixed(2)} </li>
                <li>EUR: {eurToShow.UAH.toFixed(2)}</li>
            </ul>
            )
        }else{
            return (
        <ul className="slider-menu">
            <li>...oops, some trouble with server</li>
            <li>sorry </li>
        </ul>)
            
        }
    }

    return (
        <div className="container">
        <div className="header-bar">
            <h1 className="logo">Exchanger</h1>
           {render()}
        </div>
    </div>
    );
}

export default Header;
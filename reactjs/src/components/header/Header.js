import React from 'react';
import './header.scss';
import logo from '../../tigo-logo.png';

const Header = () => {
    return ( 
        <header>
            <figure>
                <img src={logo} alt="Logo tigo"/>
            </figure>
            <div className="login">
                <span> <i className="fas fa-user"></i> Hola, Juan</span>
            </div>
        </header>
    );
}
 
export default Header;
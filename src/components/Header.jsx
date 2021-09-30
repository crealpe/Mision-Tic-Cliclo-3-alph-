import React from 'react'
import { Link } from 'react-router-dom';
import '../App.css';

const Header = () => {
    return (
        <div>
         <ul className="header">
            <h1>Alph@ Team</h1>
            <li></li>
            <li></li>
            <li>
                <Link to='/'>
                <button className="boton">Iniciar Sesion</button>
                </Link>
            </li>
            <li>
            <Link to='/registro'>
                <button className="boton">Registrarse</button>
                </Link>
            </li>    
         </ul>
        </div>
    )
}

export default Header

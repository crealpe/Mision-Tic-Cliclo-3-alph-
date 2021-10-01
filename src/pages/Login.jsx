import React from 'react'
import { Link } from 'react-router-dom';
import '../App.css';

const Login = () => {
    return (
        <div>
            <h2 className="titulo">Inicio de sesion</h2>
            <form>
                <div className="contenido">
                    <label>Email: </label>
                    <input className="input" type='email' placeholder='Ingrese su email' required></input>
                    <label>Password: </label>
                    <input className="input" type='password' placeholder='Ingrese su password' required></input>
                    <Link to='/admin'>
                    <button className="botoninicio" type='submit'>Ingresar</button>
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default Login

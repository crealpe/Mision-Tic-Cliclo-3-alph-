import React from 'react'
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
const Sidebar = () => {
    const { logout } = useAuth0();

  const cerrarSesion = () => {
    logout({ returnTo: 'http://localhost:3000' });
    localStorage.setItem('token', null);
  };
    return (
        <nav className="w-72 bg-purple-400">
            <ul className="w-full flex flex-col justify-center items-center my-4">
                <li className='text-center font-extrabold text-3xl text-gray-900 '>
                    Alph@ Team
                </li>
                <div  className="my-10">

                <li>  
                    <Link to= '/menu'> 
                    <button className="botonGenerico secondaryButton my-4 w-52">Ventas</button>
                    </Link>
                </li>
                <li>   
                    <Link to= '/menu/producto'> 
                    <button className="botonGenerico secondaryButton my-4 w-52">Productos</button>
                    </Link>
                </li>
                <li>   
                    <Link to= '/menu/actualizar-usuario'> 
                    <button className="botonGenerico secondaryButton my-4 w-52">Roles y Usuarios</button>
                    </Link>
                </li>
                <li>   
                
                    <button onClick={() => cerrarSesion()} type="button" className="botonGenerico secondaryButton my-4 w-52">Cerrar Sesión</button>
                 
                </li>
                </div>
            </ul>
        </nav>
    )
}

export default Sidebar

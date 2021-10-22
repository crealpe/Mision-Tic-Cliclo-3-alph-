import React from 'react'
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import PrivateComponent from './PrivateComponent';
const Sidebar = () => {
    const { user,logout } = useAuth0();
  console.log("datos usuario",user);  
  const cerrarSesion = () => {
    logout({ returnTo: 'http://localhost:3000/menu' });
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
                <PrivateComponent roleList={['Administrador','Vendedor']}> 
                    <Link to= '/menu/venta'> 
                    <button className="botonGenerico secondaryButton my-4 w-52">Ventas</button>
                    </Link>
                </PrivateComponent>    
                </li>
                <li>  
                <PrivateComponent roleList={['Administrador','Vendedor']}>  
                    <Link to= '/menu/producto'> 
                    <button className="botonGenerico secondaryButton my-4 w-52">Productos</button>
                    </Link>
                </PrivateComponent>     
                </li>
                <li>   
                <PrivateComponent roleList={['Administrador']}>
                    <Link to= '/menu/actualizar-usuario'> 
                    <button className="botonGenerico secondaryButton my-4 w-52">Roles y Usuarios</button>
                    </Link>
                </PrivateComponent>
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

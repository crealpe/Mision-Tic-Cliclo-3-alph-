import React from 'react'
import { Link } from 'react-router-dom';
const Sidebar = () => {
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
                    <Link to= '/menu/rol'> 
                    <button className="botonGenerico secondaryButton my-4 w-52">Roles y Usuarios</button>
                    </Link>
                </li>
                <li>   
                <Link to= '/'>
                    <button type="button" className="botonGenerico secondaryButton my-4 w-52">Salir</button>
                </Link>    
                </li>
                </div>
            </ul>
        </nav>
    )
}

export default Sidebar

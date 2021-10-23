import React from 'react'
//import { Link } from 'react-router-dom';
const Header = () => {
    
    return (
        <nav  className='bg-purple-400 py-4'>
            <ul className="flex w-full justify-between">
                <li className='text-center font-extrabold text-3xl text-gray-900'>
                Alph@ Team
                </li>
                <li> 
                
                    {/* <Link to= '/'>
                     <button type="button" onClick={() => loginWithRedirect()} className="botonGenerico secondaryButton mx-4 w-36">Ingresar</button>   
                    </Link>  
                    <Link to= '/registro'>
                        <button type="button" className="botonGenerico secondaryButton mx-4 w-36">Registrar</button>
                    </Link>   */}
                      
                    
                </li>
            </ul>
           
        </nav>
    );
}

export default Header

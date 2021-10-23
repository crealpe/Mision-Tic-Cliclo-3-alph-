import React from 'react';
import { Link } from "react-router-dom";
const Index = () => {
    return(
        <div>
            <h2 className="titulo">Inicio de sesion</h2>
                <div className="contenido">
                    <Link to='/menu'>
                    <button className="botoninicio" type="button">Ingresar</button>
                    </Link>
                                 
                </div>
       </div>
    );    
}
export default Index;
import { Link } from "react-router-dom";

function Index(){
    return(
        <div>
            <h2 className="titulo">Inicio de sesion</h2>
            <form>
                <div className="contenido">
                    <label className="label">Email: </label>
                    <input className="input" type='email' placeholder='Ingrese su email' required></input>
                    <label className="label">Password: </label>
                    <input className="input" type='password' placeholder='Ingrese su password' required></input>
                    <Link to='/menu'>
                    <button className="botoninicio" type='submit'>Ingresar</button>
                    </Link>
                    
                </div>

            </form>
        </div>
    );    
}
export default Index;
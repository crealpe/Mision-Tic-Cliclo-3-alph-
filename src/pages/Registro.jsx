import React from 'react'

const Registro = () => {
    return (
        <div>
            <h2 className="titulo">Crea tu cuenta</h2>
            <form>
                <div className="contenido">
                    <label>Nombre: </label>
                    <input className="input" type='text' placeholder='Ingrese su nombre' required></input>
                    <label>Apellido: </label>
                    <input className="input" type='text' placeholder='Ingrese su apellido' required></input>
                    <label>Email: </label>
                    <input className="input" type='email' placeholder='Ingrese su email' required></input>
                    <label>Password: </label>
                    <input className="input" type='password' placeholder='Ingrese su password' required></input>
                    <label>Confirme su password: </label>
                    <input className="input" type='password' placeholder='Ingrese su password' required></input>
                    <button className="botoninicio" type='submit'>Ingresar</button>
                </div>
            </form>

        </div>
    )
}

export default Registro

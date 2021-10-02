import React from 'react';

class ActualizarUsuario extends React.Component {
  render() {
    return (
      <div>
        <h2 className="titulo">Actualizar Usuario</h2>
        <form>
          <div className="contenido">
            <div>
              <label className="label">Email</label>
              <input type="email" className="input"/>
            </div>
            <div>
              <label className="label">Rol</label>
              <select className="input appearance-none">
                <option value="vendedor">Vendedor</option>
                <option value="administrador">Administrador</option>
              </select>
            </div>
            <div>
              <label className="label">Estado</label>
              <select className="input appearance-none">
                <option value="pendiente">Pendiente</option>
                <option value="autorizado">Autorizado</option>
                <option value="no_autorizado">No Autorizado</option>
              </select>
            </div>
            <input className="botoninicio" type="submit" value="Registrar" />
          </div>
        </form>
      </div>
    );
  }
}

export default ActualizarUsuario;

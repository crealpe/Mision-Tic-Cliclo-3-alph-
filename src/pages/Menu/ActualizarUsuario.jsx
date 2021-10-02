import React from 'react';

class ActualizarUsuario extends React.Component {
  render() {
    return (
      <div>
        <h2 className="titulo">Actualizar Usuario</h2>
        <form>
          <div className="contenido">
            
              <label className="label">Email</label>
              <input type="email" className="input"/>
            
              <label className="label">Rol</label>
              <select className="input" defaultValue="0">
                <option value="0" disabled>Seleccione una opción</option>
                <option value="vendedor">Vendedor</option>
                <option value="administrador">Administrador</option>
              </select>
            
              <label className="label">Estado</label>
              <select className="input" defaultValue="0">
              <option value="0" disabled>Seleccione una opción</option>
                <option value="pendiente">Pendiente</option>
                <option value="autorizado">Autorizado</option>
                <option value="no_autorizado">No Autorizado</option>
              </select>
            
            <input className="botoninicio" type="submit" value="Registrar" />
          </div>
        </form>
      </div>
    );
  }
}

export default ActualizarUsuario;

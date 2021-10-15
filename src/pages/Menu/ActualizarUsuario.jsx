import React, { useEffect, useState, useRef } from 'react';
import { nanoid } from 'nanoid';
import { obtenerUsuarios, crearUsuarios, editarUsuarios } from 'utils/api';
import { ToastContainer, toast } from 'react-toastify';
import { Tooltip } from '@material-ui/core';
import 'react-toastify/dist/ReactToastify.css';

const ActualizarUsuario = () => {
  const [mostrarTabla, setMostrarTabla] = useState(true);
  const [usuarios, setUsuarios] = useState([]);
  const [textoBoton, setTextoBoton] = useState('Crear Nuevo');
  const [ejecutarConsulta, setEjecutarConsulta] = useState(true);
  
  useEffect(() => {
    if (ejecutarConsulta) {
      obtenerUsuarios(
        (response) => {
          setUsuarios(response.data);
          setEjecutarConsulta(false);
        },
        (error) => {
          console.error(error);
        }  
      );       
    }
  }, [ejecutarConsulta]);


  useEffect(() => {
  if (mostrarTabla) {
      setTextoBoton('Nuevo Usuario');
      setEjecutarConsulta(true);
  } else {
      setTextoBoton('Listar Usuarios');
  
  }
  }, [mostrarTabla]);  
  return (
      <div>
          
          {mostrarTabla ? (
              
              <TablaUsuarios listaUsuarios={usuarios} setEjecutarConsulta={setEjecutarConsulta} setMostrarTabla={setMostrarTabla}/>
         ) : (
              <FormularioCreacionUsuarios
              setMostrarTabla={setMostrarTabla}
              listaUsuarios={usuarios}
              setUsuarios={setUsuarios}
              />
         )}
         <button
              onClick={() => {
                  setMostrarTabla(!mostrarTabla);
              }}
              className="botonGenerico secondaryButton my-4">
              {textoBoton}
          </button> 
          <ToastContainer position='bottom-center' autoClose={5000} />
      </div>
      
  )
}

const FormularioCreacionUsuarios=({setMostrarTabla, listaUsuarios, setUsuarios})=>{
  const form = useRef(null);
  const submitForm = async(e) => {
      e.preventDefault();
      const fd = new FormData(form.current);
  
      const nuevoUsuario = {};
      fd.forEach((value, key) => {
          nuevoUsuario[key] = value;
      });

      await crearUsuarios({ nombre: nuevoUsuario.nombre, rol:nuevoUsuario.rol,estado:nuevoUsuario.estado },
        (response) => {
          console.log(response.data);
          toast.success('Usuarios agregado con éxito');  
        },
        (error) => {
          console.error(error);
          toast.error('Error creando el Usuario');  
        }  
      );
      
      setMostrarTabla(true);
  
  };
  return(
      <div>
          <h2 className="titulo">Nuevo Usuario</h2>
          <form ref={form} onSubmit={submitForm}>
              <div className="contenido">
                      <label className="mx-5" htmlFor='nombre'>Nombre Usuario: </label>
                      <input className="input" type='text' name="nombre" placeholder='Nombre usuario' required></input>
                  
                      <label className="mx-5" htmlFor='rol'>Rol Usuario: </label>
                      <select className="input" defaultValue="" name="rol" required>
                          <option value = "" disabled> Seleccione Rol</option>
                          <option value="Administrador">Administrador</option>
                          <option value="Vendedor">Vendedor</option>
                                                    
                      </select>
                  
                      <label className="mx-5" htmlFor='estado'>Estado Usuario: </label>
                      <select className="input" defaultValue="0" name="estado">
                          <option value = "0" disabled> Seleccione Estado</option>
                          <option value="Pendiente">Pendiente</option>
                          <option value="Autorizado">Autorizado</option>
                          <option value="No autorizado">No autorizado</option>
                          
                      </select>
                 
              
                      <button className="botoninicio" type='submit'>Agregar</button>
                    
              </div> 
                
          </form>
      </div>
  )
};
const TablaUsuarios = ({ listaUsuarios,setEjecutarConsulta,setMostrarTabla}) => {
  const [UsuariosFiltrados, setUsuariosFiltrados] = useState(listaUsuarios);
  const [busqueda, setBusqueda] = useState('');
         
  useEffect(() => {
      setUsuariosFiltrados(
        listaUsuarios.filter((elemento) => {
        return JSON.stringify(elemento).toLowerCase().includes(busqueda.toLowerCase());
        //return (elemento.fecha) >= fechaI && (elemento.fecha) <= fechaF;
    })
    );
  }, [busqueda,listaUsuarios]);

  return (
      <div>
          <h2 className="titulo">Usuarios</h2>
          <label className="mx-5">Busqueda: </label>
          <input className = "input" type="text"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
          />
          <table className="tabla">
              <thead>
                  <tr className="bg-green-50">
                  <th  className="border-2"> Usuario </th>
                  <th  className="border-2"> Rol </th>
                  <th  className="border-2"> Estado </th>
                  <th className="border-2"></th>
                  </tr>
              </thead>
              <tbody>
                  {UsuariosFiltrados.map((usuarios) => {
                      return (
                          <FilaUsuario
                          key={nanoid()}
                          usuarios={usuarios}
                          setEjecutarConsulta={setEjecutarConsulta}
                          setMostrarTabla = {setMostrarTabla}
                          />
                      );
                  })}
   

              </tbody>
          </table>    
      </div>
  );
};

const FilaUsuario = ({ usuarios, setEjecutarConsulta, setMostrarTabla}) => {
  const [edit, setEdit] = useState(false);
  const [infoNuevoUsuario, setInfoNuevoUsuario] = useState({
      nombre: usuarios.nombre,
      rol: usuarios.rol,
      estado: usuarios.estado

  });
  const actualizarUsuario = async () => {
    await editarUsuarios(usuarios._id,infoNuevoUsuario,
      (response) => {
        console.log(response.data);
        toast.success('Usuario modificado con éxito');
        setEdit(false);
        setEjecutarConsulta(true);  
      },
      (error) => {
        toast.error('Error modificando el Usuario');
        console.error(error);  
      }
    );      
  };
    return (
      <tr>
        {edit ? (
          
          <>
              
            <td>
              <input
                  className='bg-gray-50 border w-28 border-gray-400 p-0.5 rounded-lg m-0.5'
                  type='text'
                  value={infoNuevoUsuario.nombre}
                  onChange={(e) =>
                      setInfoNuevoUsuario({ ...infoNuevoUsuario, nombre: e.target.value })
                  }
              />
            </td>
            
            <td>
              <select className='bg-gray-50 border border-gray-400 w-28 p-0.5 rounded-lg m-0.5'
              value ={infoNuevoUsuario.rol} onChange={(e) =>
                  setInfoNuevoUsuario({ ...infoNuevoUsuario, rol: e.target.value })
              }>
                          <option value="Administrador">Administrador</option>
                          <option value="Vendedor">Vendedor</option>
                          
              </select>
            </td>
            <td>
              <select className='bg-gray-50 border border-gray-400 w-28 p-0.5 rounded-lg m-0.5'
              value ={infoNuevoUsuario.estado} onChange={(e) =>
                  setInfoNuevoUsuario({ ...infoNuevoUsuario, estado: e.target.value })
              }>
                          <option value="Pendiente">Pendiente</option>
                          <option value="Autorizado">Autorizado</option>
                          <option value="No autorizado">No autorizado</option>
                          
              </select>
            </td>
          </>
        ) : (
          <>
            <td>{usuarios.nombre}</td>
            <td>{usuarios.rol}</td>
            <td>{usuarios.estado}</td>
          </>
        )}
        <td>
          <div className='flex w-full justify-around'>
            {edit ? (
              <>
                <Tooltip title='Confirmar Edición' arrow>
                  <i
                    onClick={() => actualizarUsuario()}
                    className='fas fa-check text-green-700 hover:text-green-500'
                  />
                </Tooltip>
                <Tooltip title='Cancelar edición' arrow>
                  <i
                    onClick={() => setEdit(!edit)}
                    className='fas fa-ban text-yellow-700 hover:text-yellow-500'
                  />
                </Tooltip>
              </>
            ) : (
              <>
                <Tooltip title='Editar usuario' arrow>
                  <i
                    onClick={() => {
                        setEdit(!edit);
                     
                  }}
                    className='fas fa-pencil-alt text-yellow-700 hover:text-yellow-500'
                  />
                </Tooltip>
                
              </>
            )}
          </div>
          
        </td>
      </tr>
    );
};  

export default ActualizarUsuario

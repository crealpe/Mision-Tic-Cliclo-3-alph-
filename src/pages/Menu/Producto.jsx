import React, { useEffect, useState, useRef } from 'react';
import { nanoid } from 'nanoid';
import { ToastContainer, toast } from 'react-toastify';
import { obtenerProductos, crearProductos, editarProductos } from 'utils/api';
//import { Dialog, Tooltip } from '@material-ui/core';
import { Tooltip } from '@material-ui/core';
import 'react-toastify/dist/ReactToastify.css';

const Producto = () => {
    const [mostrarTabla, setMostrarTabla] = useState(true);
    const [productos, setProductos] = useState([]);
    const [textoBoton, setTextoBoton] = useState('Crear Nuevo Producto');
    const [ejecutarConsulta, setEjecutarConsulta] = useState(true);
    
    useEffect(() => {
      if (ejecutarConsulta) {
        obtenerProductos(
          (response) => {
            setProductos(response.data);
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
        setTextoBoton('Nuevo Producto');
        setEjecutarConsulta(true);
    } else {
        setTextoBoton('Listar Productos');
    
    }
    }, [mostrarTabla]);  
    return (
        <div>
            
            {mostrarTabla ? (
                
                <TablaProductos listaProductos={productos} setEjecutarConsulta={setEjecutarConsulta} setMostrarTabla={setMostrarTabla}/>
           ) : (
                <FormularioCreacionProductos
                setMostrarTabla={setMostrarTabla}
                listaProductos={productos}
                setProductos={setProductos}
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

const FormularioCreacionProductos=({setMostrarTabla, listaProductos, setProductos})=>{
    const form = useRef(null);
    const submitForm = async(e) => {
        e.preventDefault();
        const fd = new FormData(form.current);
    
        const nuevoProducto = {};
        fd.forEach((value, key) => {
            nuevoProducto[key] = value;
        });

        await crearProductos({ nombre: nuevoProducto.nombre, valor:nuevoProducto.valor,estado:nuevoProducto.estado},
          (response) => {
            console.log(response.data);
            toast.success('Producto agregado con éxito');  
          },
          (error) => {
            console.error(error);
            toast.error('Error creando el Producto');  
          }  
        );
        
        setMostrarTabla(true);
    
    };
    return(
        <div>
            <h2 className="titulo">Nuevo Producto</h2>
            <form ref={form} onSubmit={submitForm}>
                <div className="contenido">
                        <label className="mx-5" htmlFor='nombre'>Nombre Producto: </label>
                        <input className="input" type='text' name="nombre" placeholder='Nombre Producto' required></input>
                    
                        <label className="mx-5" htmlFor='valor'>Valor Producto: </label>
                        <input className="input" type="number" name = "valor" placeholder='Valor' required></input>
                    
                        <label className="mx-5" htmlFor='estado'>Estado Producto: </label>
                        <select className="input" defaultValue="" name="estado" required>
                            <option value = "" disabled> Seleccione Estado</option>
                            <option value="Disponible">Disponible</option>
                            <option value="No Disponible">No Disponible</option>
                            
                        </select>
                   
                
                        <button className="botoninicio" type='submit'>Agregar</button>
                      
                </div> 
                  
            </form>
        </div>
    )
};
const TablaProductos = ({ listaProductos,setEjecutarConsulta,setMostrarTabla}) => {
    const [ProductosFiltrados, setProductosFiltrados] = useState(listaProductos);
    const [busqueda, setBusqueda] = useState('');
           
    useEffect(() => {
        setProductosFiltrados(
          listaProductos.filter((elemento) => {
          return JSON.stringify(elemento).toLowerCase().includes(busqueda.toLowerCase());
          //return (elemento.fecha) >= fechaI && (elemento.fecha) <= fechaF;
      })
      );
    }, [busqueda,listaProductos]);

    return (
        <div>
            <h2 className="titulo">Lista de Productos</h2>
            <label className="mx-5">Busqueda: </label>
            <input className = "input" type="text"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
            />
            <table className="tabla">
                <thead>
                    <tr className="bg-green-50">
                    <th  className="border-2"> Producto </th>
                    <th  className="border-2"> Valor </th>
                    <th  className="border-2"> Estado </th>
                    <th className="border-2"></th>
                    </tr>
                </thead>
                <tbody>
                    {ProductosFiltrados.map((productos) => {
                        return (
                            <FilaProducto
                            key={nanoid()}
                            productos={productos}
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

  const FilaProducto = ({ productos, setEjecutarConsulta, setMostrarTabla}) => {
    const [edit, setEdit] = useState(false);
    const [infoNuevoProducto, setInfoNuevoProducto] = useState({
        nombre: productos.nombre,
        valor: productos.valor,
        estado: productos.estado

    });
    const actualizarProducto = async () => {
      await editarProductos(productos._id,infoNuevoProducto,
        (response) => {
          console.log(response.data);
          toast.success('Producto modificado con éxito');
          setEdit(false);
          setEjecutarConsulta(true);  
        },
        (error) => {
          toast.error('Error modificando el producto');
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
                    value={infoNuevoProducto.nombre}
                    onChange={(e) =>
                        setInfoNuevoProducto({ ...infoNuevoProducto, nombre: e.target.value })
                    }
                />
              </td>
              
              <td>
                <input
                    className='bg-gray-50 border border-gray-400 w-14 p-0.5 rounded-lg m-0.5'
                    type='text'
                    value={infoNuevoProducto.valor}
                    onChange={(e) =>
                        setInfoNuevoProducto({ ...infoNuevoProducto, valor: e.target.value })
                    }
                />
              </td>
              <td>
                <select className='bg-gray-50 border border-gray-400 w-28 p-0.5 rounded-lg m-0.5'
                value ={infoNuevoProducto.estado} onChange={(e) =>
                    setInfoNuevoProducto({ ...infoNuevoProducto, estado: e.target.value })
                }>
                            <option value="Disponible">Disponible</option>
                            <option value="No Disponible">No Disponible</option>
                            
                </select>
              </td>
            </>
          ) : (
            <>
              <td>{productos.nombre}</td>
              <td>{productos.valor}</td>
              <td>{productos.estado}</td>
            </>
          )}
          <td>
            <div className='flex w-full justify-around'>
              {edit ? (
                <>
                  <Tooltip title='Confirmar Edición' arrow>
                    <i
                      onClick={() => actualizarProducto()}
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
                  <Tooltip title='Editar Producto' arrow>
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

export default Producto

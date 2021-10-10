import React, { useEffect, useState, useRef } from 'react';
import { obtenerVentas } from 'utils/api';
import { nanoid } from 'nanoid';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import { Dialog, Tooltip } from '@material-ui/core';
import 'react-toastify/dist/ReactToastify.css';

const Venta = () => {
    const [mostrarTabla, setMostrarTabla] = useState(true);
    const [ventas, setVentas] = useState([]);
    const [textoBoton, setTextoBoton] = useState('Crear Nueva Venta');
    const [ejecutarConsulta, setEjecutarConsulta] = useState(true);
    
    useEffect(() => {
        console.log('consulta', ejecutarConsulta);
        if (ejecutarConsulta) {
            obtenerVentas(setVentas, setEjecutarConsulta);
        }
    }, [ejecutarConsulta]);

   
    useEffect(() => {
    if (mostrarTabla) {
        setTextoBoton('Nueva Venta');
        setEjecutarConsulta(true);
        
    } else {
        setTextoBoton('Listar Ventas');
    
    }
    }, [mostrarTabla]);  
    return (
        <div>
            
            {mostrarTabla ? (
                
                <TablaVentas listaVentas={ventas} setEjecutarConsulta={setEjecutarConsulta} setMostrarTabla={setMostrarTabla} />
           ) : (
                <FormularioCreacionVentas
                setMostrarTabla={setMostrarTabla}
                listaVentas={ventas}
                setVentas={setVentas}
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

const FormularioCreacionVentas=({setMostrarTabla, listaVentas, setVentas})=>{
    const form = useRef(null);
    const [productos, setProductos] = useState([]);
    const obtenerProductos = async () => {
      const options = { method: 'GET', url: 'http://localhost:5000/productos/' };
      await axios
        .request(options)
        .then(function (response) {
          setProductos(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
      
    }    
    useEffect(() => {
     obtenerProductos();        
    
    }, [productos]);


    const submitForm = async (e) => {
        e.preventDefault();
        const fd = new FormData(form.current);
    
        const nuevaVenta = {};
        fd.forEach((value, key) => {
            nuevaVenta[key] = value;
        });
    
        const options = {
          method: 'POST',
          url: 'http://localhost:5000/ventas/nuevo',
          headers: { 'Content-Type': 'application/json' },
          data: { fecha: nuevaVenta.fecha, numeroV: nuevaVenta.numeroV, identificacionC: nuevaVenta.identificacionC,
            nombreC:nuevaVenta.nombreC,vendedor:nuevaVenta.vendedor,producto:nuevaVenta.producto,cantidad:nuevaVenta.cantidad,
            valor:nuevaVenta.valor,estado:nuevaVenta.estado},
        };
    
        await axios
          .request(options)
          .then(function (response) {
            console.log(response.data);
            toast.success('Venta agregada con éxito');
          })
          .catch(function (error) {
            console.error(error);
            toast.error('Error creando la Venta');
          });
    
        setMostrarTabla(true);
      };
    return(
        <div>
            <h2 className="titulo">Nueva Venta</h2>
            <form ref={form} onSubmit={submitForm}>
                <ul className="grid grid-cols-3">
                    <li className="flex flex-col">
                        <label className="mx-5" htmlFor='fecha'>Fecha: </label>
                        <input className="input" type='date' name = "fecha" placeholder='Fecha' required></input>
                    </li>
                    <li>
                    </li>
                    <li>
                    </li>    
                    <li className="flex flex-col">
                        <label className="mx-5" htmlFor='identificacionC'>Identificación Cliente: </label>
                        <input className="input" type='text' name="identificacionC" placeholder='Identificación Cliente' required ></input>
                    </li>  
                    <li className="flex flex-col">
                        <label className="mx-5" htmlFor='nombreC'>Nombre Cliente: </label>
                        <input className="input" type='text' name="nombreC" placeholder='Nombre Cliente' required></input>
                    </li>  
                    <li className="flex flex-col">
                        <label className="mx-5" htmlFor='vendedor'>Vendedor: </label>
                        <select className="input" defaultValue="0" name="vendedor">
                            <option value = "0" disabled> Seleccione Vendedor</option>
                            <option value="Vendedor 1">Vendedor 1</option>
                            <option value="Vendedor 2">Vendedor 2</option>
                            <option value="Vendedor 3">Vendedor 3</option>
                            <option value="Vendedor 4">Vendedor 4</option>
                        </select>
                    </li>     
                    <li className="flex flex-col">
                        <label className="mx-5" htmlFor='producto'>Producto: </label>
                        <select className="input" defaultValue="0" name="producto">
                            <option value = "0" disabled> Seleccione Producto</option>
                            {productos.map((productos) => {
                                return (
                                  <option value={productos.nombre}>{productos.nombre}</option>
                                );
                            })}
                            
                        </select>
                    </li>   
                    <li className="flex flex-col">
                        <label className="mx-5" htmlFor='cantidad'>Cantidad: </label>
                        <input className="input" type='number' name = "cantidad" placeholder='Cantidad' required></input>
                    </li>
                    <li className="flex flex-col">
                        <label className="mx-5" htmlFor='valor'>Valor: </label>
                        <input className="input" type="number" name = "valor" placeholder='Valor' required></input>
                    </li> 
                    <input className="input" type="hidden" name = "estado" value="En proceso"></input>
                     
                </ul>
                <ul className="flex flex-col justify-between my-4 items-center">
                    <li className="flex flex-col">
                        <button className="botoninicio" type='submit'>Agregar</button>
                    </li>   
                </ul> 
                  
            </form>
        </div>
    )
};
const TablaVentas = ({ listaVentas, setEjecutarConsulta,setMostrarTabla}) => {
    const [ventasFiltradas, setVentasFiltradas] = useState(listaVentas);
    const [fechaI, setFechaI] = useState('');
    const [fechaF, setFechaF] = useState('');
       
    useEffect(() => {
      setVentasFiltradas(
          listaVentas.filter((elemento) => {
          //return JSON.stringify(elemento).toLowerCase().includes(busqueda.toLowerCase());
          return (elemento.fecha) >= fechaI && (elemento.fecha) <= fechaF;
      })
      );
    }, [fechaI,fechaF, listaVentas]);

    return (
        <div>
            <h2 className="titulo">Lista de Ventas</h2>
            <label className="mx-5">Fecha Inicial: </label>
            <input className = "input" type="date" name = "fechaI"
                value={fechaI}
                onChange={(e) => setFechaI(e.target.value)}
            />
            <label className="mx-5">Fecha Final: </label>
            <input className = "input" type="date" name= "fechaF"
                value={fechaF}
                onChange={(e) => setFechaF(e.target.value)}
           />
            
            <table className='tabla'>
                <thead>
                    <tr>
                    <th  className="border-2"> Fecha </th>
                    <th  className="border-2"> Id Cliente </th>
                    <th  className="border-2"> Cliente </th>
                    <th  className="border-2"> Vendedor </th>
                    <th  className="border-2"> Producto </th>
                    <th  className="border-2"> Cantidad </th>
                    <th  className="border-2"> Valor </th>
                    <th  className="border-2"> Estado </th>
                    <th className="border-2"></th>
                    </tr>
                </thead>
                <tbody>
                {ventasFiltradas.map((venta) => {
                    return (
                        <FilaVenta
                        key={nanoid()}
                        venta={venta}
                        setEjecutarConsulta={setEjecutarConsulta}
                        setMostrarTabla = {setMostrarTabla}
                        />
                    );
                    })
                }
                </tbody>
            </table>    
        </div>
    );
};

const FilaVenta = ({ venta, setEjecutarConsulta, setMostrarTabla }) => {
    const [edit, setEdit] = useState(false);
    const [productos, setProductos] = useState([]);
    const obtenerProductos = async () => {
      const options = { method: 'GET', url: 'http://localhost:5000/productos/' };
      await axios
        .request(options)
        .then(function (response) {
          setProductos(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
      
    }    
    useEffect(() => {
     obtenerProductos();        
    
    }, [productos]);

    const [infoNuevaVenta, setInfoNuevaVenta] = useState({
        fecha: venta.fecha,
        identificacionC: venta.identificacionC,
        nombreC: venta.nombreC,
        vendedor: venta.vendedor,
        producto: venta.producto,
        cantidad: venta.cantidad,
        valor: venta.valor,
        estado: venta.estado

    });
    const actualizarVenta = async () => {
          const options = {
          method: 'PATCH',
          url: 'http://localhost:5000/ventas/editar/',
          headers: { 'Content-Type': 'application/json' },
          data: { ...infoNuevaVenta, id: venta._id },
        };
    
        await axios
          .request(options)
          .then(function (response) {
            console.log(response.data);
            toast.success('Venta modificada con éxito');
            setEdit(false);
            setEjecutarConsulta(true);
          })
          .catch(function (error) {
            toast.error('Error modificando la venta');
            console.error(error);
        });
        
    };
      return (
        <tr>
          {edit ? (
            
            <>
                
                <td>
                <input
                  className='bg-gray-50 border w-36 border-gray-400 p-0.5 rounded-lg m-0.5'
                  type='date'
                  value={infoNuevaVenta.fecha}
                  onChange={(e) => setInfoNuevaVenta({ ...infoNuevaVenta, fecha: e.target.value })}
                />
              </td>
              
              <td>
                <input
                  className='bg-gray-50 border w-24 border-gray-400 p-0.5 rounded-lg m-0.5'
                  type='text'
                  value={infoNuevaVenta.identificacionC}
                  onChange={(e) =>
                    setInfoNuevaVenta({ ...infoNuevaVenta, identificacionC: e.target.value })
                  }
                />
              </td>
              <td>
                <input
                    className='bg-gray-50 border w-28 border-gray-400 p-0.5 rounded-lg m-0.5'
                    type='text'
                    value={infoNuevaVenta.nombreC}
                    onChange={(e) =>
                        setInfoNuevaVenta({ ...infoNuevaVenta, nombreC: e.target.value })
                    }
                />
              </td>
              <td>
                
                <select className='bg-gray-50 border border-gray-400 w-28 p-0.5 rounded-lg m-0.5'
                value={infoNuevaVenta.vendedor}
                onChange={(e) =>
                    setInfoNuevaVenta({ ...infoNuevaVenta, vendedor: e.target.value })
                }>
                    <option value="Vendedor 1">Vendedor 1</option>
                    <option value="Vendedor 2">Vendedor 2</option>
                    <option value="Vendedor 3">Vendedor 3</option>
                    <option value="Vendedor 4">Vendedor 4</option>
                </select>
              </td>
              <td>
                
                <select className='bg-gray-50 border border-gray-400 w-28 p-0.5 rounded-lg m-0.5'
                  value={infoNuevaVenta.producto}
                  onChange={(e) =>
                      setInfoNuevaVenta({ ...infoNuevaVenta, producto: e.target.value })
                  }
                >
                    {productos.map((productos) => {
                        return (
                          <option value={productos.nombre}>{productos.nombre}</option>
                        );
                    })}
                </select>
              </td>
              <td>
                <input
                    className='bg-gray-50 border border-gray-400 w-12 p-0.5 rounded-lg m-0.5'
                    type='text'
                    value={infoNuevaVenta.cantidad}
                    onChange={(e) =>
                        setInfoNuevaVenta({ ...infoNuevaVenta, cantidad: e.target.value })
                    }
                />
              </td>
              <td>
                <input
                    className='bg-gray-50 border border-gray-400 w-14 p-0.5 rounded-lg m-0.5'
                    type='text'
                    value={infoNuevaVenta.valor}
                    onChange={(e) =>
                        setInfoNuevaVenta({ ...infoNuevaVenta, valor: e.target.value })
                    }
                />
              </td>
              <td>
                <select className='bg-gray-50 border border-gray-400 w-28 p-0.5 rounded-lg m-0.5'
                value ={infoNuevaVenta.estado} onChange={(e) =>
                  setInfoNuevaVenta({ ...infoNuevaVenta, estado: e.target.value })
                }>
                            <option value="En proceso">En proceso</option>
                            <option value="Entregada">Entregada</option>
                            <option value="Cancelada">Cancelada</option>
                            
                </select>
              </td>
            </>
          ) : (
            <>
              <td>{venta.fecha}</td>
              <td>{venta.identificacionC}</td>
              <td>{venta.nombreC}</td>
              <td>{venta.vendedor}</td>
              <td>{venta.producto}</td>
              <td>{venta.cantidad}</td>
              <td>{venta.valor}</td>
              <td>{venta.estado}</td>
            </>
          )}
          <td>
            <div className='flex w-full justify-around'>
              {edit ? (
                <>
                  <Tooltip title='Confirmar Edición' arrow>
                    <i
                      onClick={() => actualizarVenta()}
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
                  <Tooltip title='Editar Venta' arrow>
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

export default Venta


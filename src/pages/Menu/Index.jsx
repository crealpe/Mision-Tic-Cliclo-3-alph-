import React, { useEffect, useState, useRef } from 'react';
//import { ToastContainer, toast } from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css';
//<ToastContainer position='bottom-center' autoClose={5000} />
const ventasBackend = [
    {
      fecha: '2021-10-01',
      numeroV: 1,
      identificacionC: '12345678',
      nombreC: 'Carlos Perez',
      idVendedor: 1,
      idProducto: 1,
      cantidad: 2,
      valor: 1000
      
    }
]    

const Venta = () => {
    const [mostrarTabla, setMostrarTabla] = useState(true);
    const [ventas, setVentas] = useState([]);
    const [textoBoton, setTextoBoton] = useState('Crear Nueva Venta');

    useEffect(() => {
        setVentas(ventasBackend);
      }, []);

      useEffect(() => {
        if (mostrarTabla) {
          setTextoBoton('Nueva Venta');
         
        } else {
          setTextoBoton('Listar Ventas');
        
        }
      }, [mostrarTabla]);  
    return (
        <div>
            
            {mostrarTabla ? (
                
                <TablaVentas listaVentas={ventas} />
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
                className="botoninicio">
                {textoBoton}
            </button> 
        </div>
        
    )
}

const FormularioCreacionVentas=({setMostrarTabla, listaVentas, setVentas})=>{
    const form = useRef(null);
    const submitForm = (e) => {
    e.preventDefault();
    const fd = new FormData(form.current);
    
    const nuevaVenta = {};
    fd.forEach((value, key) => {
      nuevaVenta[key] = value;
    });

    setMostrarTabla(true);
    setVentas([...listaVentas, nuevaVenta]);
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
                    <li className="flex flex-col">
                        <label className="mx-5" htmlFor='numeroV'>No. Venta: </label>
                        <input className="input" type='number' name = "numeroV" placeholder='Número de Venta' required></input>
                    </li>
                    <li>
                    </li>    
                    <li className="flex flex-col">
                        <label className="mx-5" htmlFor='identificacionC'>Identificación Cliente: </label>
                        <input className="input" type='text' name="identificacionC" placeholder='Identificación Cliente' required></input>
                    </li>  
                    <li className="flex flex-col">
                        <label className="mx-5" htmlFor='nombreC'>Nombre Cliente: </label>
                        <input className="input" type='text' name="nombreC" placeholder='Nombre Cliente' required></input>
                    </li>  
                    <li className="flex flex-col">
                        <label className="mx-5" htmlFor='idVendedor'>Vendedor: </label>
                        <select className="input" defaultValue="0" name="idVendedor">
                            <option value = "0" disabled> Seleccione Vendedor</option>
                            <option value="1">Vendedor 1</option>
                            <option value="2">Vendedor 2</option>
                            <option value="3">Vendedor 3</option>
                            <option value="4">Vendedor 4</option>
                        </select>
                    </li>     
                    <li className="flex flex-col">
                        <label className="mx-5" htmlFor='idProducto'>Producto: </label>
                        <select className="input" defaultValue="0" name="idProducto">
                            <option value = "0" disabled> Seleccione Producto</option>
                            <option value="1">Producto 1</option>
                            <option value="2">Producto2</option>
                            <option value="3">Producto3</option>
                            <option value="4">Producto4</option>
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
const TablaVentas = ({ listaVentas }) => {
    return (
        <div>
            <h2 className="titulo">Lista de Ventas</h2>
            <table cellspacing="5" cellpadding="10">
                <thead>
                    <tr className="bg-green-50">
                    <th className="border-2"> Fecha </th>
                    <th  className="border-2"> No. Venta </th>
                    <th  className="border-2"> Id Cliente </th>
                    <th  className="border-2"> Cliente </th>
                    <th  className="border-2"> Id Vendedor </th>
                    <th  className="border-2"> Id Producto </th>
                    <th  className="border-2"> Cantidad </th>
                    <th  className="border-2"> Valor </th>
                    <th className="border-2"></th>
                    </tr>
                </thead>
                <tbody>
                    {listaVentas.map((ventas) => {
                        return (
                        <tr>
                            <td   className="border-2">{ventas.fecha}</td>
                            <td   className="border-2">{ventas.numeroV}</td>
                            <td   className="border-2">{ventas.identificacionC}</td>
                            <td   className="border-2">{ventas.nombreC}</td>
                            <td   className="border-2">{ventas.idVendedor}</td>
                            <td   className="border-2">{ventas.idProducto}</td>
                            <td   className="border-2">{ventas.cantidad}</td>
                            <td   className="border-2">{ventas.valor}</td>
                            <td   className="border-2"><button className="border-2 bg-green-100 rounded-lg text-sm">Actualizar</button></td>
                        </tr>
                        );
                    })}
                </tbody>
            </table>    
        </div>
    );
  };

export default Venta


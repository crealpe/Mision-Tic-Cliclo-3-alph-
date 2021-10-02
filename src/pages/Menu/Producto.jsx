import React, { useEffect, useState, useRef } from 'react';
//import { ToastContainer, toast } from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css';
//<ToastContainer position='bottom-center' autoClose={5000} />
const productosBackend = [
    {
      idProducto: 1,
      nombre: "Producto 1",
      valor: 1000,
      estado: "Disponible"
    }
]    

const Producto = () => {
    const [mostrarTabla, setMostrarTabla] = useState(true);
    const [productos, setProductos] = useState([]);
    const [textoBoton, setTextoBoton] = useState('Crear Nuevo Producto');

    useEffect(() => {
        setProductos(productosBackend);
      }, []);

      useEffect(() => {
        if (mostrarTabla) {
          setTextoBoton('Nuevo Producto');
         
        } else {
          setTextoBoton('Listar Productos');
        
        }
      }, [mostrarTabla]);  
    return (
        <div>
            
            {mostrarTabla ? (
                
                <TablaProductos listaProductos={productos} />
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
        </div>
        
    )
}

const FormularioCreacionProductos=({setMostrarTabla, listaProductos, setProductos})=>{
    const form = useRef(null);
    const submitForm = (e) => {
    e.preventDefault();
    const fd = new FormData(form.current);
    
    const nuevoProducto = {};
    fd.forEach((value, key) => {
        nuevoProducto[key] = value;
    });

    setMostrarTabla(true);
    setProductos([...listaProductos, nuevoProducto]);
    };
    return(
        <div>
            <h2 className="titulo">Nuevo Producto</h2>
            <form ref={form} onSubmit={submitForm}>
                <div className="contenido">
                    
                        <label className="mx-5" htmlFor='idProducto'>Id Producto: </label>
                        <input className="input" type='number' name="idProducto" placeholder='Id Producto' required></input>
                    
                        <label className="mx-5" htmlFor='nombre'>Nombre Producto: </label>
                        <input className="input" type='text' name="nombre" placeholder='Nombre Producto' required></input>
                    
                        <label className="mx-5" htmlFor='valor'>Valor Producto: </label>
                        <input className="input" type="number" name = "valor" placeholder='Valor' required></input>
                    
                        <label className="mx-5" htmlFor='estado'>Estado Producto: </label>
                        <select className="input" defaultValue="0" name="estado">
                            <option value = "0" disabled> Seleccione Estado</option>
                            <option value="Disponible">Disponible</option>
                            <option value="No Disponible">No Disponible</option>
                            
                        </select>
                   
                
                        <button className="botoninicio" type='submit'>Agregar</button>
                      
                </div> 
                  
            </form>
        </div>
    )
};
const TablaProductos = ({ listaProductos}) => {
    return (
        <div>
            <h2 className="titulo">Lista de Productos</h2>
            <table cellspacing="5" cellpadding="10">
                <thead>
                    <tr className="bg-green-50">
                    <th  className="border-2"> Id Producto </th>
                    <th  className="border-2"> Producto </th>
                    <th  className="border-2"> Valor </th>
                    <th  className="border-2"> Estado </th>
                    <th className="border-2"></th>
                    </tr>
                </thead>
                <tbody>
                    {listaProductos.map((productos) => {
                        return (
                        <tr>
                            <td   className="border-2">{productos.idProducto}</td>
                            <td   className="border-2">{productos.nombre}</td>
                            <td   className="border-2">{productos.valor}</td>
                            <td   className="border-2">{productos.estado}</td>
                            <td   className="border-2"><button className="border-2 bg-green-100 rounded-lg text-sm">Actualizar</button></td>
                        </tr>
                        );
                    })}
                </tbody>
            </table>    
        </div>
    );
  };

export default Producto

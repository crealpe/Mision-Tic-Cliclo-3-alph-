import { getDB } from '../../db/db.js';
import { ObjectId } from 'mongodb';
const consultarProductos = async(callback) =>{
    const baseDeDatos = getDB();
    await baseDeDatos.collection('productos').find().limit(50).toArray(callback);
};

const nuevoProducto = async(datosProductos,callback) =>{
    const baseDeDatos = getDB();
    await baseDeDatos.collection('productos').insertOne(datosProductos,callback);
};

const editarProducto = async(id, edicion, callback) =>{
    const filtroProducto = { _id: new ObjectId(id) };
    const operacion = {
      $set: edicion,
    };
    const baseDeDatos = getDB();
    await baseDeDatos
        .collection('productos')
        .findOneAndUpdate(filtroProducto, operacion, { upsert: true, returnOriginal: true }, callback);
};

export { consultarProductos,nuevoProducto,editarProducto };
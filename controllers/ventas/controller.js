import { getDB } from '../../db/db.js';
import { ObjectId } from 'mongodb';
const consultarVentas = async(callback) =>{
    const baseDeDatos = getDB();
    await baseDeDatos.collection('ventas').find().limit(50).toArray(callback);
};

const nuevaVenta = async(datosVenta,callback) =>{
    const baseDeDatos = getDB();
    await baseDeDatos.collection('ventas').insertOne(datosVenta,callback);
};

const editarVenta = async(id, edicion, callback) =>{
    const filtroVenta = { _id: new ObjectId(id) };
    const operacion = {
      $set: edicion,
    };
    const baseDeDatos = getDB();
    await baseDeDatos
        .collection('ventas')
        .findOneAndUpdate(filtroVenta, operacion, { upsert: true, returnOriginal: true }, callback);
};

export { consultarVentas,nuevaVenta,editarVenta };
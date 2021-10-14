import { getDB } from '../../db/db.js';
import { ObjectId } from 'mongodb';
const consultarUsuarios = async(callback) =>{
    const baseDeDatos = getDB();
    await baseDeDatos.collection('usuarios').find().limit(50).toArray(callback);
};

const nuevoUsuario = async(datosUsuarios,callback) =>{
    const baseDeDatos = getDB();
    await baseDeDatos.collection('usuarios').insertOne(datosUsuarios,callback);
};

const editarUsuario = async(id, edicion, callback) =>{
    const filtroUsuario = { _id: new ObjectId(id) };
    const operacion = {
      $set: edicion,
    };
    const baseDeDatos = getDB();
    await baseDeDatos
        .collection('usuarios')
        .findOneAndUpdate(filtroUsuario, operacion, { upsert: true, returnOriginal: true }, callback);
};

export { consultarUsuarios,nuevoUsuario,editarUsuario };
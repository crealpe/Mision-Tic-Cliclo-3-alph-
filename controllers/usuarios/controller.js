import { getDB } from '../../db/db.js';
import { ObjectId } from 'mongodb';
import jwt_decode from 'jwt-decode';
const consultarUsuarios = async(callback) =>{
    const baseDeDatos = getDB();
    await baseDeDatos.collection('usuarios').find().limit(50).toArray(callback);
};
const consultarOCrearUsuario = async (req, callback) => {
    // 6.1. obtener los datos del usuario desde el token
    const token = req.headers.authorization.split('Bearer ')[1];
    console.log(token);
    const user = jwt_decode(token)['http://localhost/userData'];
    console.log(user);
  
    // 6.2. con el correo del usuario o con el id de auth0, verificar si el usuario ya esta en la bd o no
    const baseDeDatos = getDB();
    await baseDeDatos.collection('usuarios').findOne({ email: user.email }, async (err, response) => {
      console.log('response consulta bd', response);
      if (response) {
        // 7.1. si el usuario ya esta en la BD, devuelve la info del usuario
        callback(err, response);
      } else {
        // 7.2. si el usuario no esta en la bd, lo crea y devuelve la info
        user.auth0ID = user._id;
        delete user._id;
        user.rol = 'sin rol';
        user.estado = 'pendiente';
        await nuevoUsuario(user, (err, respuesta) => callback(err, user));
      }
    });
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

export { consultarUsuarios,nuevoUsuario,editarUsuario,consultarOCrearUsuario };
import { getDB } from '../db/db.js';
import { ObjectId } from 'mongodb';
import jwt_decode from 'jwt-decode';
const autorizacionEstadoUsuario = async (req,res,next)=>{
    const token = req.headers.authorization.split('Bearer ')[1];
    console.log(token);
    const user = jwt_decode(token)['http://localhost/userData'];
    console.log(user);
  
    const baseDeDatos = getDB();
    await baseDeDatos.collection('usuarios').findOne({ email: user.email }, async (err, response) => {
        if (response) {
            console.log("Estado",response.estado);
            // paso 3: verificar el estado del usuario.
            if (response.estado === 'No autorizado') {
              // paso 4: si el usuario es rechazado, devolver un error de autenticacion.
              res.sendStatus(401);
              res.end();
            } else {
              // paso 5: si el usuario está pendiente o habilitado, ejecutar next()
              next();
            }
          } else {
            next();
          }
    });
}

export default autorizacionEstadoUsuario;
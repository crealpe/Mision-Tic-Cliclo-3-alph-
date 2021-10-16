import Express from 'express';
import { consultarUsuarios,nuevoUsuario,editarUsuario, consultarOCrearUsuario } from '../../controllers/usuarios/controller.js';

const rutasUsuarios = Express.Router();

const genericCallback = (res) => (err, result) => {
  if (err) {
    res.status(500).json({ error: err });
  } else {
    res.json(result);
  }
};

rutasUsuarios.route('/usuarios').get((req, res) => {
  consultarUsuarios(genericCallback(res));
});

rutasUsuarios.route('/usuarios').post((req, res) => {
  nuevoUsuario(req.body,genericCallback(res));
});

rutasUsuarios.route('/usuarios/self').get((req, res) => {
  console.log('alguien hizo get en la ruta /self');
  consultarOCrearUsuario(req,genericCallback(res));
});

rutasUsuarios.route('/usuarios/:id').patch((req, res) => {
  editarUsuario(req.params.id, req.body, genericCallback(res));
});
  
export default rutasUsuarios;



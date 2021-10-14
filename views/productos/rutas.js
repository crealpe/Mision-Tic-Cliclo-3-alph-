import Express from 'express';
import { consultarProductos,nuevoProducto,editarProducto } from '../../controllers/productos/controller.js';
const rutasProductos = Express.Router();

const genericCallback = (res) => (err, result) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.json(result);
    }
};

rutasProductos.route('/productos').get((req, res) => {
  consultarProductos(genericCallback(res));
});

rutasProductos.route('/productos').post((req, res) => {
  nuevoProducto(req.body,genericCallback(res));
});
  
rutasProductos.route('/productos/:id').patch((req, res) => {
  editarProducto(req.params.id, req.body, genericCallback(res));
});
  
export default rutasProductos;
import Express from 'express';
import { consultarVentas,nuevaVenta,editarVenta } from '../../controllers/ventas/controller.js';
const rutasVentas = Express.Router();
const genericCallback = (res) => (err, result) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.json(result);
    }
};

rutasVentas.route('/ventas').get((req, res) => {
  consultarVentas(genericCallback(res));
});

rutasVentas.route('/ventas').post((req, res) => {
    nuevaVenta(req.body,genericCallback(res));
});
  
rutasVentas.route('/ventas/:id').patch((req, res) => {
    editarVenta(req.params.id, req.body, genericCallback(res));
});
  
export default rutasVentas;
import Express from 'express';
import Cors from 'cors';
import dotenv from 'dotenv';
import { conectarBD } from './db/db.js';
import rutasVentas from './views/ventas/rutas.js';
import rutasProductos from './views/productos/rutas.js';
import rutasUsuarios from './views/usuarios/rutas.js';
dotenv.config({ path: './.env' });

const app = Express();

app.use(Express.json());
app.use(Cors());
app.use(rutasVentas);
app.use(rutasProductos);
app.use(rutasUsuarios);
const main = () => {
  return app.listen(process.env.PORT, () => {
    console.log(`escuchando puerto ${process.env.PORT}`);
  });  
};
conectarBD(main);
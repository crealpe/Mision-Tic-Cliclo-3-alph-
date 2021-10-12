// hacer el import de express tradicional
// const express = require('express');

// hacer el nuevo import
import Express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import Cors from 'cors';

const stringConexion = 'mongodb+srv://Admin:Sis01@proyectoconcesionario.rdqu7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const client = new MongoClient(stringConexion, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let baseDeDatos;

const app = Express();

app.use(Express.json());
app.use(Cors());

app.get('/ventas', (req, res) => {
  console.log('alguien hizo get en la ruta /ventas');
  baseDeDatos
    .collection('ventas')
    .find()
    .limit(50)
    .toArray((err, result) => {
      if (err) {
        res.status(500).send('Error consultando las ventas');
      } else {
        res.json(result);
      }
    });
});

app.get('/productos', (req, res) => {
  console.log('alguien hizo get en la ruta /productos');
  baseDeDatos
    .collection('productos')
    .find()
    .limit(50)
    .toArray((err, result) => {
      if (err) {
        res.status(500).send('Error consultando los productos');
      } else {
        res.json(result);
      }
    });
});

app.get('/usuarios', (req, res) => {
  console.log('alguien hizo get en la ruta /usuarios');
  baseDeDatos
    .collection('usuarios')
    .find()
    .limit(50)
    .toArray((err, result) => {
      if (err) {
        res.status(500).send('Error consultando los usuarios');
      } else {
        res.json(result);
      }
    });
});

app.post('/ventas/nuevo', (req, res) => {
  console.log(req);
  const datosVenta = req.body;
  console.log('llaves: ', Object.keys(datosVenta));
  try {
    
      baseDeDatos.collection('ventas').insertOne(datosVenta, (err, result) => {
        if (err) {
          console.error(err);
          res.sendStatus(500);
        } else {
          console.log(result);
          res.sendStatus(200);
        }
      });
    
  } catch {
    res.sendStatus(500);
  }
});

app.post('/productos/nuevo', (req, res) => {
  console.log(req);
  const datosProducto = req.body;
  console.log('llaves: ', Object.keys(datosProducto));
  try {
    
      baseDeDatos.collection('productos').insertOne(datosProducto, (err, result) => {
        if (err) {
          console.error(err);
          res.sendStatus(500);
        } else {
          console.log(result);
          res.sendStatus(200);
        }
      });
    
  } catch {
    res.sendStatus(500);
  }
});

app.post('/usuarios/nuevo', (req, res) => {
  console.log(req);
  const datosUsuario = req.body;
  console.log('llaves: ', Object.keys(datosUsuario));
  try {
    
      baseDeDatos.collection('usuarios').insertOne(datosUsuario, (err, result) => {
        if (err) {
          console.error(err);
          res.sendStatus(500);
        } else {
          console.log(result);
          res.sendStatus(200);
        }
      });
    
  } catch {
    res.sendStatus(500);
  }
});

app.patch('/ventas/editar', (req, res) => {
  const edicion = req.body;
  console.log(edicion);
  const filtroVenta = { _id: new ObjectId(edicion.id) };
  delete edicion.id;
  const operacion = {
    $set: edicion,
  };
  baseDeDatos
    .collection('ventas')
    .findOneAndUpdate(
      filtroVenta,
      operacion,
      { upsert: true, returnOriginal: true },
      (err, result) => {
        if (err) {
          console.error('error actualizando la venta: ', err);
          res.sendStatus(500);
        } else {
          console.log('actualizado con exito');
          res.sendStatus(200);
        }
      }
    );
});

app.patch('/productos/editar', (req, res) => {
  const edicion = req.body;
  console.log(edicion);
  const filtroProducto = { _id: new ObjectId(edicion.id) };
  delete edicion.id;
  const operacion = {
    $set: edicion,
  };
  baseDeDatos
    .collection('productos')
    .findOneAndUpdate(
      filtroProducto,
      operacion,
      { upsert: true, returnOriginal: true },
      (err, result) => {
        if (err) {
          console.error('error actualizando los productos: ', err);
          res.sendStatus(500);
        } else {
          console.log('actualizado con exito');
          res.sendStatus(200);
        }
      }
    );
});

app.patch('/usuarios/editar', (req, res) => {
  const edicion = req.body;
  console.log(edicion);
  const filtroUsuario = { _id: new ObjectId(edicion.id) };
  delete edicion.id;
  const operacion = {
    $set: edicion,
  };
  baseDeDatos
    .collection('usuarios')
    .findOneAndUpdate(
      filtroUsuario,
      operacion,
      { upsert: true, returnOriginal: true },
      (err, result) => {
        if (err) {
          console.error('error actualizando los usuarios: ', err);
          res.sendStatus(500);
        } else {
          console.log('actualizado con exito');
          res.sendStatus(200);
        }
      }
    );
});

const main = () => {
  client.connect((err, db) => {
    if (err) {
      console.error('Error conectando a la base de datos');
      return 'error';
    }
    baseDeDatos = db.db('sprint3');
    console.log('baseDeDatos exitosa');
    return app.listen(5000, () => {
      console.log('escuchando puerto 5000');
    });
  });
};
main();
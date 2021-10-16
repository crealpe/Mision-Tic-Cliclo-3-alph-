import axios from 'axios';
const getToken = () => {
  return `Bearer ${localStorage.getItem('token')}`;
};

export const obtenerDatosUsuario = async (successCallback, errorCallback) => {
  const options = {
    method: 'GET',
    url: 'http://localhost:5000/usuarios/self/',
    headers: {
      Authorization: getToken(), // 3. enviarle el token a backend
    },
  };
  await axios.request(options).then(successCallback).catch(errorCallback);
};


export const obtenerVentas = async (successCalback, errorCalback) => {
  const options = { method: 'GET', url: 'http://localhost:5000/ventas/',
  headers: {
    Authorization: getToken(),
  },
  };
  
  await axios.request(options).then(successCalback).catch(errorCalback); 
};

export const crearVentas = async (data,successCalback, errorCalback) => {
  const options = { method: 'POST', url: 'http://localhost:5000/ventas/',
  headers: { 'Content-Type': 'application/json',Authorization: getToken() },
  data, 
  };
  await axios.request(options).then(successCalback).catch(errorCalback); 
};

export const editarVentas = async (id, data, successCalback, errorCalback) => {
  const options = { method: 'PATCH',
  url: `http://localhost:5000/ventas/${id}/`,
  headers: { 'Content-Type': 'application/json',Authorization: getToken() },
  data,
  };
  await axios.request(options).then(successCalback).catch(errorCalback); 
};

export const obtenerProductos = async (successCalback, errorCalback) => {
  const options = { method: 'GET', url: 'http://localhost:5000/productos/',
  headers: {
    Authorization: getToken(),
  },
  };
  await axios.request(options).then(successCalback).catch(errorCalback); 
};

export const crearProductos = async (data,successCalback, errorCalback) => {
  const options = { method: 'POST', url: 'http://localhost:5000/productos/',
  headers: { 'Content-Type': 'application/json',Authorization: getToken() },
  data, 
  };
  await axios.request(options).then(successCalback).catch(errorCalback); 
};

export const editarProductos = async (id, data, successCalback, errorCalback) => {
  const options = { method: 'PATCH',
  url: `http://localhost:5000/productos/${id}/`,
  headers: { 'Content-Type': 'application/json',Authorization: getToken() },
  data,
  };
  await axios.request(options).then(successCalback).catch(errorCalback); 
};

export const obtenerUsuarios = async (successCalback, errorCalback) => {
  const options = { method: 'GET', url: 'http://localhost:5000/usuarios/',
  headers: {
    Authorization: getToken(),
  },
};
  await axios.request(options).then(successCalback).catch(errorCalback); 
};


export const crearUsuarios = async (data,successCalback, errorCalback) => {
  const options = { method: 'POST', url: 'http://localhost:5000/usuarios/',
  headers: { 'Content-Type': 'application/json',Authorization: getToken() },
  data, 
  };
  await axios.request(options).then(successCalback).catch(errorCalback); 
};

export const editarUsuarios = async (id, data, successCalback, errorCalback) => {
  const options = { method: 'PATCH',
  url: `http://localhost:5000/usuarios/${id}/`,
  headers: { 'Content-Type': 'application/json',Authorization: getToken() },
  data,
  };
  await axios.request(options).then(successCalback).catch(errorCalback); 
};
import axios from 'axios';

export const obtenerVentas = async (setVentas, setEjecutarConsulta) => {
  const options = { method: 'GET', url: 'http://localhost:5000/ventas/' };
  await axios
    .request(options)
    .then(function (response) {
        setVentas(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
  setEjecutarConsulta(false);
};
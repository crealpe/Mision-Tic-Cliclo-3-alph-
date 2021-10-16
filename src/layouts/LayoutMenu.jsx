import React, { useEffect, useState } from 'react';
import Sidebar from 'components/Sidebar';
import { useAuth0 } from '@auth0/auth0-react';
import { obtenerDatosUsuario } from 'utils/api';
import { useUser } from 'context/userContext';
const LayoutMenu = ({children}) => {
  const { isAuthenticated, isLoading, loginWithRedirect, getAccessTokenSilently, logout } =
    useAuth0();
  const [loadingUserInformation, setLoadingUserInformation] = useState(false);
  const { setUserData } = useUser();
  useEffect(() => {
    const fetchAuth0Token = async () => {
      // si se quieren hacer validaciones con el token:
      // if (localStorage.getItem('token')) {
      //   // validar fecha de expiracion del token
      // } else {
      //   // pedir token
      // }

      // 1. pedir token a auth0
      setLoadingUserInformation(true);
      const accessToken = await getAccessTokenSilently({
        audience: `api-ventas-mintic`,
      });
      // 2. recibir token de auth0
      localStorage.setItem('token', accessToken);
      console.log(accessToken);
      // 3. enviarle el token a el backend
      await obtenerDatosUsuario(
        (response) => {
          console.log('response con datos del usuario', response);
          setUserData(response.data);
          setLoadingUserInformation(false);
        },
        (err) => {
          console.log('err', err);
          setLoadingUserInformation(false);
         // logout({ returnTo: 'http://localhost:3000/admin' });
        }
      );
    };
    if (isAuthenticated) {
      fetchAuth0Token();
    }
  }, [isAuthenticated, getAccessTokenSilently]);

 // if (isLoading || loadingUserInformation)
  //  return <ReactLoading type='cylon' color='#abc123' height={667} width={375} />;

  if (!isAuthenticated) {
    return loginWithRedirect();
  }
 
  return (
      <div className="flex justify-between w-screen h-screen">
          <Sidebar />
          <main className="flex w-full overflow-y-scroll flex-col items-center"> 
              {children}
          </main>    
      </div>
  )
}

export default LayoutMenu;

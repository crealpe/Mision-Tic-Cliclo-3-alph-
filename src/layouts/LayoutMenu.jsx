import React, { useEffect, useState } from 'react';
import Sidebar from 'components/Sidebar';
import { useAuth0 } from '@auth0/auth0-react';
const LayoutMenu = ({children}) => {
    const { isAuthenticated, loginWithRedirect, getAccessTokenSilently, logout } =
    useAuth0();
 // const [loadingUserInformation, setLoadingUserInformation] = useState(false);
 // const { setUserData } = useUser();

  useEffect(() => {
    const fetchAuth0Token = async () => {
      // 1. pedir token a auth0
      //setLoadingUserInformation(true);
      const accessToken = await getAccessTokenSilently({
        audience: `api-ventas-mintic`,
      });
      // 2. recibir token de auth0
      localStorage.setItem('token', accessToken);
      console.log(accessToken);
      // 3. enviarle el token a el backend
      
    };
    if (isAuthenticated) {
      fetchAuth0Token();
    }
  }, [isAuthenticated, getAccessTokenSilently]);

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

export default LayoutMenu

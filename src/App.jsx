import 'styles/styles.css';
import React, { useState } from 'react';
import ActualizarUsuario from 'pages/Menu/ActualizarUsuario';
import Index from 'pages/Index';
import Registro from 'pages/Registro';
import Venta from 'pages/Menu/Venta';
import Producto from 'pages/Menu/Producto';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Layout from 'layouts/Layout';
import LayoutMenu from 'layouts/LayoutMenu';
import { Auth0Provider } from '@auth0/auth0-react';
import PrivateRoute from 'components/PrivateRoute';
import { UserContext } from 'context/userContext';
import Admin from 'pages/Menu/Index';
function App() {
  const [userData, setUserData] = useState({});
  return (
    <Auth0Provider
      domain='misiontic3.us.auth0.com'
      clientId='g9sMPUByRUpNGl72wO0BoZN7j5qXPjMB'
      redirectUri='http://localhost:3000'
      audience='api-ventas-mintic'
    >
    <div>
    <UserContext.Provider value={{ userData, setUserData }}>
      <Router>
        <Switch>
          <Route path={['/menu','/menu/venta','/menu/actualizar-usuario','/menu/producto']}>
            <LayoutMenu> 
              <Switch>
                <Route path='/menu/actualizar-usuario'>
                <PrivateRoute roleList={['Administrador']}> 
                  <ActualizarUsuario />
                </PrivateRoute>  
                </Route> 
                <Route path='/menu/producto'>
                <PrivateRoute roleList={['Administrador','Vendedor']}> 
                  <Producto />
                </PrivateRoute>    
                </Route> 
                <Route path='/menu/venta'>
                <PrivateRoute roleList={['Administrador','Vendedor']}> 
                  <Venta />
                </PrivateRoute>    
                </Route>  
                <Route path='/menu'>
                  <Admin />
                </Route>  
              </Switch>
            </LayoutMenu>
          </Route>
           <Route path={['/','/registro']}>
            <Layout> 
              <Switch>
                <Route path='/registro'>
                  <Registro />
                </Route>
                <Route path='/'>
                  <Index />
                </Route>
              </Switch>  
            </Layout>   
          </Route>  
        </Switch>
     </Router>
     </UserContext.Provider>
      
    </div>
    </Auth0Provider>
  );
}

export default App;

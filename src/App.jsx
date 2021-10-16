import 'styles/styles.css';
import ActualizarUsuario from 'pages/Menu/ActualizarUsuario';
import Index from 'pages/Index';
import Registro from 'pages/Registro';
import IndexM from 'pages/Menu/Index';
import Producto from 'pages/Menu/Producto';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Layout from 'layouts/Layout';
import LayoutMenu from 'layouts/LayoutMenu';
import { Auth0Provider } from '@auth0/auth0-react';
//import PrivateRoute from 'components/PrivateRoute';
function App() {
  return (
    <Auth0Provider
      domain='misiontic3.us.auth0.com'
      clientId='g9sMPUByRUpNGl72wO0BoZN7j5qXPjMB'
      redirectUri='http://localhost:3000'
      audience='api-ventas-mintic'
    >
    <div>
      <Router>
        <Switch>
          <Route path={['/menu','/menu/actualizar-usuario','/menu/producto']}>
            <LayoutMenu> 
              <Switch>
                <Route path='/menu/actualizar-usuario'>
                  <ActualizarUsuario />
                </Route> 
                <Route path='/menu/producto'>
                  <Producto />
                </Route> 
                <Route path='/menu'>
                  <IndexM />
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
    </div>
    </Auth0Provider>
  );
}

export default App;

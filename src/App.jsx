import 'styles/styles.css';
import Index from 'pages/Index';
import Registro from 'pages/Registro';
import IndexM from 'pages/Menu/Index';
import Venta from 'pages/Menu/Venta';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Layout from 'layouts/Layout';
import LayoutMenu from 'layouts/LayoutMenu';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path={['/menu','/menu/ventas']}>
            <LayoutMenu> 
              <Switch>
              <Route path='/menu/ventas'>
                  <Venta />
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
  );
}

export default App;

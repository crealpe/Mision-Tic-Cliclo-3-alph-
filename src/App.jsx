import Layout from './layout/Layout';
import Registro from './pages/Registro';
import Login from './pages/Login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';


function App() {
  return (
    <Router>
      <Switch>
        <Route path={['/registro', '/']}>
          <Layout>
            <Switch>
              <Route path='/registro'>
                <Registro />
              </Route>
              <Route path='/'>
                <Login />
              </Route>
            </Switch>
          </Layout>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

import React from 'react';
import { Router, Switch, Route } from 'react-router';
import history from './history';
import './App.css';
import routes from './routes/routeConfigurations';
import PrivateRoute from './components/Auth/PrivateRoute';
import NavBar from './components/Navigation/NabBar';

const generateRoutes = () => routes.map(route => route.private !== false ? <PrivateRoute {...route} /> : <Route {...route} />);

function App() {
  return (
      <Router history={history}>

        <NavBar />
        <Switch>
        
          {generateRoutes()}

        </Switch>
      </Router>
  );
}

export default App;

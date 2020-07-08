import React from 'react';
import { Router, Switch, Route } from 'react-router';
import history from './history';
import './App.css';
import routes from './routes/routeConfigurations';

const generateRoutes = () => routes.map((route, key) => <Route key={key} {...route} />);

function App() {
  return (
      <Router history={history}>

        <Switch>
        
          {generateRoutes()}

        </Switch>
      </Router>
  );
}

export default App;

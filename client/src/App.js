import React from 'react';
import { Router, Switch, Route } from 'react-router';
import history from './history';
import './App.css';
import routes from './routes/routeConfigurations';
import PrivateRoute from './components/auth/PrivateRoute';
import InstallAppBanner from './components/InstallAppBanner';

const generateRoutes = () => routes.map((route, key) => (route.private === undefined || !!route.private) ?  
  <PrivateRoute 
    key={key} 
    {...route}
  />
  :
  <Route key={key} {...route} />);

function App() {
  return (
      <Router history={history}>

        <Switch>
        
          {generateRoutes()}

        </Switch>
        <InstallAppBanner />
      </Router>
  );
}

export default App;

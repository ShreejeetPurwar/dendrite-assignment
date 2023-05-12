import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import ProLicense from './components/ProLicense';

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/login" component={Login} />
          <Route path="/pro-license" component={ProLicense} />
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;

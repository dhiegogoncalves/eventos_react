import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import Login from './pages/login';
import NovoUsuario from './pages/usuario-novo';
import Home from './pages/home';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/novo-usuario" component={NovoUsuario} />
      </BrowserRouter>
    </Provider>
  );
}

export default App;

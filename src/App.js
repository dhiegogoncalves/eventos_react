import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import Login from './pages/login';
import NovoUsuario from './pages/usuario-novo';
import Home from './pages/home';
import RecuperarSenhaUsuario from './pages/usuario-recuperar-senha';
import CadastroEvento from './pages/evento-cadastro';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/novo-usuario" component={NovoUsuario} />
        <Route
          path="/recuperar-senha-usuario"
          component={RecuperarSenhaUsuario}
        />
        <Route path="/cadastro-evento" component={CadastroEvento} />
      </BrowserRouter>
    </Provider>
  );
}

export default App;

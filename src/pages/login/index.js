import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import firebase from '../../config/firebase';
import 'firebase/auth';

import './login.css';

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [msgTipo, setMsgTipo] = useState();

  const dispatch = useDispatch();

  function logar() {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        setMsgTipo('sucesso');
        setTimeout(() => {
          dispatch({ type: 'LOG_IN', usuarioEmail: email });
        }, 2000);
      })
      .catch(err => {
        setMsgTipo('erro');
      });
  }

  return (
    <div className="login-content d-flex align-items-center">
      {useSelector(state => state.usuarioLogado) ? <Redirect to="/" /> : null}

      <form className="form-signin mx-auto">
        <div className="text-center mb-4">
          <i class="fas fa-calendar-alt text-white my-2 fa-4x"></i>
          <h1 className="h3 mb-3 font-weight-normal text-white font-weight-bold">
            Login
          </h1>
        </div>

        <input
          type="email"
          id="inputEmail"
          className="form-control my-2 shadow-none"
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          id="inputPassword"
          className="form-control my-2 shadow-none"
          placeholder="Senha"
          onChange={e => setPassword(e.target.value)}
        />

        <button
          onClick={logar}
          className="btn btn-lg btn-block btn-login shadow-none"
          type="button"
        >
          Entrar
        </button>

        <div className="msg-login text-white text-center my-5">
          {msgTipo === 'sucesso' && (
            <span>
              <strong>WoW!</strong> Você está conectado!
            </span>
          )}
          {msgTipo === 'erro' && (
            <span>
              <strong>Ops!</strong> Verifique se a senha ou usuário estão
              corretos!
            </span>
          )}
        </div>

        <div className="opcoes-login mt-5 text-center">
          <Link to="/recuperar-senha-usuario" className="mx-2">
            Recuperar Senha
          </Link>
          <span className="text-white">|</span>
          <Link to="#" className="mx-2">
            Quero Cadastrar
          </Link>
        </div>
      </form>
    </div>
  );
}

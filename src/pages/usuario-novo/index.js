import React, { useState } from 'react';
import firebase from '../../config/firebase';
import 'firebase/auth';

import Navbar from '../../components/navbar';

import './usuario-novo.css';

export default function NovoUsuario() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [msgTipo, setMsgTipo] = useState();
  const [msg, setMsg] = useState();
  const [carregando, setCarregando] = useState();

  function cadastrar() {
    setMsgTipo(null);
    const emailPattern = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
    setCarregando(true);

    if (!email || !password) {
      setMsgTipo('erro');
      setMsg('Você precisa informar o email e senha para fazer o cadastro!');
      return;
    } else if (!emailPattern.test(email)) {
      setMsgTipo('erro');
      setMsg('O formato do seu email é inválido!');
      return;
    } else if (password.length < 6) {
      setMsgTipo('erro');
      setMsg('A senha deve ter pelo menos 6 caracteres!');
      return;
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        setCarregando(false);
        setMsgTipo('sucesso');
      })
      .catch(err => {
        setCarregando(false);
        setMsgTipo('erro');
        switch (err.message) {
          case 'The email address is already in use by another account.':
            setMsg('Este email já está sendo utilizado por outro usuário!');
            break;

          default:
            setMsg('Não foi possível cadastrar. Tente novamente mais tarde!');
            break;
        }
      });
  }

  return (
    <>
      <Navbar />

      <div className="form-cadastro">
        <form className="text-center form-login mx-auto mt-5">
          <h1 className="h3 mb-3 text-black font-weight-bold">Cadastro</h1>

          <input
            onChange={e => setEmail(e.target.value)}
            type="email"
            className="form-control my-2 shadow-none"
            placeholder="Email"
          />
          <input
            onChange={e => setPassword(e.target.value)}
            type="password"
            className="form-control my-2 shadow-none"
            placeholder="Senha"
          />

          {carregando ? (
            <div className="spinner-border text-danger" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <button
              onClick={cadastrar}
              type="button"
              className="btn btn-lg btn-block mt-3 mb-5 btn-cadastro"
            >
              Cadastrar
            </button>
          )}

          <div className="msg-login  text-center my-5">
            {msgTipo === 'sucesso' && (
              <span className="text-success">
                Usuário cadastrado com sucesso!
              </span>
            )}
            {msgTipo === 'erro' && <span className="text-danger">{msg}</span>}
          </div>
        </form>
      </div>
    </>
  );
}

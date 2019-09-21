import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import firebase from '../../config/firebase';
import 'firebase/auth';
import Navbar from '../../components/navbar';

import './evento-cadastro.css';

export default function CadastroEvento() {
  const [titulo, setTitulo] = useState();
  const [tipo, setTipo] = useState();
  const [detalhes, setDetalhes] = useState();
  const [data, setData] = useState();
  const [hora, setHora] = useState();
  const [foto, setFoto] = useState();
  const [msgTipo, setMsgTipo] = useState();
  const [carregando, setCarregando] = useState();
  const usuarioEmail = useSelector(state => state.usuarioEmail);

  const storage = firebase.storage();
  const db = firebase.firestore();

  function cadastrar() {
    setMsgTipo(null);
    setCarregando(true);
    let nomeArquivo = '';

    if (foto) {
      nomeArquivo = `${foto.name.split('.')[0]}${new Date().getTime()}.${
        foto.name.split('.')[foto.name.split('.').length - 1]
      }`;
    }

    try {
      storage
        .ref(`imagens/${nomeArquivo}`)
        .put(foto)
        .then(() => {
          db.collection('eventos')
            .add({
              titulo: titulo,
              tipo: tipo,
              detalhes: detalhes,
              data: data,
              hora: hora,
              usuario: usuarioEmail,
              visualizacoes: 0,
              foto: nomeArquivo,
              publico: true,
              criacao: new Date()
            })
            .then(() => {
              setMsgTipo('sucesso');
              setCarregando(false);
            });
        });
    } catch (error) {
      setMsgTipo('erro');
      setCarregando(false);
    }
  }

  return (
    <>
      <Navbar />
      <div className="col-12 mt-5">
        <div className="row">
          <h3 className="mx-auto font-weight-bold">Novo Evento</h3>
        </div>

        <form>
          <div className="form-group">
            <label>Título:</label>
            <input
              onChange={e => setTitulo(e.target.value)}
              type="text"
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label>Tipo do Evento:</label>
            <select
              onChange={e => setTipo(e.target.value)}
              className="form-control"
            >
              <option disabled selected value>
                -- Selecione um tipo --
              </option>
              <option>Festa</option>
              <option>Teatro</option>
              <option>Show</option>
              <option>Evento</option>
            </select>
          </div>

          <div className="form-group">
            <label>Descrição de Evento:</label>
            <textarea
              onChange={e => setDetalhes(e.target.value)}
              rows="3"
              className="form-control"
            />
          </div>

          <div className="form-group row">
            <div className="col-6">
              <label>Data:</label>
              <input
                onChange={e => setData(e.target.value)}
                type="date"
                className="form-control"
              />
            </div>
            <div className="col-6">
              <label>Hora:</label>
              <input
                onChange={e => setHora(e.target.value)}
                type="time"
                className="form-control"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Upload da Foto:</label>
            <input
              onChange={e => setFoto(e.target.files[0])}
              type="file"
              className="form-control"
            />
          </div>

          <div className="row">
            {carregando ? (
              <div
                className="spinner-border text-danger mx-auto row"
                role="status"
              >
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              <button
                onClick={cadastrar}
                type="button"
                className="btn btn-lg btn-block mt-3 mb-5 btn-cadastro"
              >
                Publicar Evento
              </button>
            )}
          </div>

          <div className="msg-login  text-center my-5">
            {msgTipo === 'sucesso' && (
              <span className="text-success">
                Evento publicado com sucesso!
              </span>
            )}
            {msgTipo === 'erro' && (
              <span className="text-danger">
                Não foi possível publicar o evento!
              </span>
            )}
          </div>
        </form>
      </div>
    </>
  );
}

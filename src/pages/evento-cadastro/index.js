import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import firebase from '../../config/firebase';
import 'firebase/auth';
import Navbar from '../../components/navbar';

import './evento-cadastro.css';

export default function CadastroEvento({ match }) {
  const [titulo, setTitulo] = useState();
  const [tipo, setTipo] = useState();
  const [detalhes, setDetalhes] = useState();
  const [data, setData] = useState();
  const [hora, setHora] = useState();
  const [fotoNova, setFotoNova] = useState();
  const [fotoAtual, setFotoAtual] = useState();
  const [msgTipo, setMsgTipo] = useState();
  const [carregando, setCarregando] = useState();
  const usuarioEmail = useSelector(state => state.usuarioEmail);

  const storage = firebase.storage();
  const db = firebase.firestore();

  function cadastrar(e) {
    e.preventDefault();
    const form = e.target;

    setMsgTipo(null);
    setCarregando(true);
    let nomeArquivo = '';

    if (fotoNova) {
      nomeArquivo = `${fotoNova.name.split('.')[0]}${new Date().getTime()}.${
        fotoNova.name.split('.')[fotoNova.name.split('.').length - 1]
      }`;
    }

    try {
      storage
        .ref(`imagens/${nomeArquivo}`)
        .put(fotoNova)
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
              form.reset();
              limparCampos();
              setMsgTipo('sucesso');
              setCarregando(false);
            });
        });
    } catch (error) {
      setMsgTipo('erro');
      setCarregando(false);
    }
  }

  function atualizar(e) {
    e.preventDefault();

    setMsgTipo(null);
    setCarregando(true);
    let nomeArquivo = '';

    if (fotoNova) {
      nomeArquivo = `${fotoNova.name.split('.')[0]}${new Date().getTime()}.${
        fotoNova.name.split('.')[fotoNova.name.split('.').length - 1]
      }`;
    }

    try {
      if (fotoNova) {
        storage.ref(`imagens/${nomeArquivo}`).put(fotoNova);
      }

      db.collection('eventos')
        .doc(match.params.id)
        .update({
          titulo: titulo,
          tipo: tipo,
          detalhes: detalhes,
          data: data,
          hora: hora,
          foto: fotoNova ? nomeArquivo : fotoAtual
        })
        .then(() => {
          setMsgTipo('sucesso');
          setCarregando(false);
        });
    } catch (error) {
      setMsgTipo('erro');
      setCarregando(false);
    }
  }

  useEffect(() => {
    if (match.params.id) {
      firebase
        .firestore()
        .collection('eventos')
        .doc(match.params.id)
        .get()
        .then(res => {
          setTitulo(res.data().titulo);
          setTipo(res.data().tipo);
          setDetalhes(res.data().detalhes);
          setData(res.data().data);
          setHora(res.data().hora);
          setFotoAtual(res.data().foto);
        });
    }
  }, [match.params.id]);

  function limparCampos() {
    setTitulo('');
    setTipo('');
    setDetalhes('');
    setData('');
    setHora('');
    setFotoNova('');
  }

  return (
    <>
      <Navbar />
      <div className="col-12 mt-5">
        <div className="row">
          <h3 className="mx-auto font-weight-bold">
            {match.params.id ? 'Atualizar Evento' : 'Novo Evento'}
          </h3>
        </div>

        <form onSubmit={match.params.id ? atualizar : cadastrar}>
          <div className="form-group">
            <label>Título:</label>
            <input
              onChange={e => setTitulo(e.target.value)}
              value={titulo && titulo}
              type="text"
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label>Tipo do Evento:</label>
            <select
              onChange={e => setTipo(e.target.value)}
              value={tipo && tipo}
              className="form-control"
              defaultValue=""
            >
              <option disabled value="">
                -- Selecione um tipo --
              </option>
              <option value="Festa">Festa</option>
              <option value="Teatro">Teatro</option>
              <option value="Show">Show</option>
              <option value="Evento">Evento</option>
            </select>
          </div>

          <div className="form-group">
            <label>Descrição de Evento:</label>
            <textarea
              onChange={e => setDetalhes(e.target.value)}
              value={detalhes && detalhes}
              rows="3"
              className="form-control"
            />
          </div>

          <div className="form-group row">
            <div className="col-6">
              <label>Data:</label>
              <input
                onChange={e => setData(e.target.value)}
                value={data && data}
                type="date"
                className="form-control"
              />
            </div>
            <div className="col-6">
              <label>Hora:</label>
              <input
                onChange={e => setHora(e.target.value)}
                value={hora && hora}
                type="time"
                className="form-control"
              />
            </div>
          </div>

          <div className="form-group">
            <label>
              Upload da Foto:
              {match.params.id
                ? ' (Caso queira manter a mesma foto, não precisa escolher uma nova imagem!)'
                : ''}
            </label>
            <input
              onChange={e => setFotoNova(e.target.files[0])}
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
                type="submit"
                className="btn btn-lg btn-block mt-3 mb-5 btn-cadastro"
              >
                {match.params.id ? 'Editar Evento' : 'Publicar Evento'}
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

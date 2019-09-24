import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import firebase from '../../config/firebase';
import Navbar from '../../components/navbar';

import './evento-detalhes.css';

export default function DetalhesEvento({ match }) {
  const [evento, setEvento] = useState({});
  const [urlImg, setUrlImg] = useState({});
  const [carregando, setCarregando] = useState(true);

  const usuarioEmail = useSelector(state => state.usuarioEmail);

  useEffect(() => {
    firebase
      .firestore()
      .collection('eventos')
      .doc(match.params.id)
      .get()
      .then(res => {
        setEvento(res.data());

        firebase
          .firestore()
          .collection('eventos')
          .doc(match.params.id)
          .update('visualizacoes', res.data().visualizacoes + 1);

        firebase
          .storage()
          .ref(`imagens/${res.data().foto}`)
          .getDownloadURL()
          .then(url => {
            setUrlImg(url);
            setCarregando(false);
          });
      });
  }, [match.params.id]);

  return (
    <>
      <Navbar />
      <div className="container-fluid">
        {carregando ? (
          <div className="row mt-5">
            <div className="spinner-border text-danger mx-auto" role="status">
              <span className="sr-only"></span>
            </div>
          </div>
        ) : (
          <div>
            <div className="row">
              <img src={urlImg} className="img-banner" alt="Banner" />
              <div className="col-12 text-right mt-1 color-purple">
                <i className="fas fa-eye"></i>{' '}
                <span>{evento.visualizacoes + 1}</span>
              </div>
              <h3 className="mx-auto mt-5 color-purple">
                <strong>{evento.titulo}</strong>
              </h3>
            </div>

            <div className="row mt-5 d-flex justify-content-around">
              <div className="col-md-3 col-sm-12 box-info p-3 my-2">
                <i className="fas fa-ticket-alt fa-2x"></i>
                <h5>
                  <strong>Tipo</strong>
                </h5>
                <span className="mt-3">{evento.tipo}</span>
              </div>
              <div className="col-md-3 col-sm-12 box-info p-3 my-2">
                <i className="fas fa-calendar-alt fa-2x"></i>
                <h5>
                  <strong>Data</strong>
                </h5>
                <span className="mt-3">{evento.data}</span>
              </div>
              <div className="col-md-3 col-sm-12 box-info p-3 my-2">
                <i className="fas fa-clock fa-2x"></i>
                <h5>
                  <strong>Hora</strong>
                </h5>
                <span className="mt-3">{evento.hora}</span>
              </div>
            </div>

            <div className="row box-detalhes mt-5">
              <div className="col-12 text-center">
                <h5>
                  <strong>Detalhes do Evento</strong>
                </h5>
              </div>
              <div className="col-12 text-center">
                <p>{evento.detalhes}</p>
              </div>
            </div>

            {usuarioEmail === evento.usuario ? (
              <Link
                to={`/editar-evento/${match.params.id}`}
                className="btn-editar"
              >
                <i className="fas fa-pen-square fa-3x"></i>
              </Link>
            ) : (
              ''
            )}
          </div>
        )}
      </div>
    </>
  );
}

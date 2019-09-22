import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../../config/firebase';

import './evento-card.css';

export default function EventoCard({ evento }) {
  const [urlImagem, setUrlImagem] = useState();

  useEffect(() => {
    firebase
      .storage()
      .ref(`imagens/${evento.foto}`)
      .getDownloadURL()
      .then(res => setUrlImagem(res));
  }, [evento.foto, urlImagem]);

  return (
    <div className="col-lg-2 col-md-3 col-sm-12 border m-4">
      <img
        src={urlImagem}
        className="card-img-top img-cartao mt-3"
        alt="Imagem do Evento"
      />

      <div className="card-body">
        <h5>{evento.titulo}</h5>
        <p className="card-text text-justify">{evento.detalhes}</p>

        <div className="row rodape-card d-flex align-items-center">
          <div className="col-6">
            <Link
              to={`/evento-detalhes/${evento.id}`}
              className="btn btn-sm btn-detalhes"
            >
              + detalhes
            </Link>
          </div>

          <div className="col-6 text-right">
            <i className="fas fa-eye">
              <span> {evento.visualizacoes}</span>
            </i>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import firebase from '../../config/firebase';

import Navbar from '../../components/navbar';
import EventoCard from '../../components/evento-card';

import './home.css';

export default function Home({ match }) {
  const [eventos, setEventos] = useState([]);
  const [pesquisa, setPesquisa] = useState('');

  const usuarioEmail = useSelector(state => state.usuarioEmail);

  useEffect(() => {
    let listEventos = [];

    if (match.params.param === 'meus') {
      firebase
        .firestore()
        .collection('eventos')
        .where('usuario', '==', usuarioEmail)
        .get()
        .then(res => {
          res.docs.forEach(doc => {
            if (doc.data().titulo.indexOf(pesquisa) >= 0) {
              listEventos.push({
                id: doc.id,
                ...doc.data()
              });
            }
          });
          setEventos(listEventos);
        });
    } else {
      firebase
        .firestore()
        .collection('eventos')
        .get()
        .then(res => {
          res.docs.forEach(doc => {
            if (doc.data().titulo.indexOf(pesquisa) >= 0) {
              listEventos.push({
                id: doc.id,
                ...doc.data()
              });
            }
          });
          setEventos(listEventos);
        });
    }
  }, [pesquisa, match.params.param, usuarioEmail]);

  return (
    <>
      <Navbar />

      <div className="row p-3">
        <h2 className="mx-auto p-5">Eventos Publicados</h2>
        <input
          type="text"
          className="form-control text-center mx-5"
          placeholder="Pesquisar evento pelo título..."
          onChange={e => setPesquisa(e.target.value)}
        />
      </div>

      <div className="row">
        {eventos.map(item => (
          <EventoCard key={item.id} evento={item} />
        ))}
      </div>
    </>
  );
}

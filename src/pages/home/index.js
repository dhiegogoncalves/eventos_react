import React, { useState, useEffect } from 'react';
import firebase from '../../config/firebase';

import Navbar from '../../components/navbar';
import EventoCard from '../../components/evento-card';

import './home.css';

export default function Home() {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    let listEventos = [];
    firebase
      .firestore()
      .collection('eventos')
      .get()
      .then(res => {
        res.docs.forEach(doc => {
          listEventos.push({
            id: doc.id,
            ...doc.data()
          });
        });
        setEventos(listEventos);
      });
  }, []);

  return (
    <>
      <Navbar />
      <div className="row">
        {eventos.map(item => (
          <EventoCard key={item.id} evento={item} />
        ))}
      </div>
    </>
  );
}

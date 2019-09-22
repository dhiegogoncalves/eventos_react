import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import './navbar.css';

export default function Navbar() {
  const dispatch = useDispatch();

  return (
    <nav className="navbar navbar-expand-lg">
      <span className="navbar-brand text-white font-weight-bold">
        <i className="fas fa-calendar-alt text-white fa-2x"></i>
      </span>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i className="fas fa-bars text-white"></i>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          {useSelector(state => !state.usuarioLogado) ? (
            <>
              <li className="nav-item">
                <Link to="/novo-usuario" className="nav-link">
                  Cadastrar
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to="cadastro-evento" className="nav-link">
                  Publicar Evento
                </Link>
              </li>
              <li className="nav-item">
                <Link to="#" className="nav-link">
                  Meus Eventos
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  onClick={() => dispatch({ type: 'LOG_OUT' })}
                >
                  Sair
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './componentes/Header';
import Footer from './componentes/Footer';

export default function Incio() {
  const navigate = useNavigate();

  return (
    <div className="vh-100 d-flex flex-column bg-light">
      <Header />

      <main className="flex-grow-1 d-flex flex-column justify-content-center align-items-center">
        <h2 className="display-5 mb-5">Bienvenido a la página de incidencias</h2>

        <div className="d-flex gap-3">
          <button className="btn btn-secondary btn-lg rounded-pill px-4" onClick={() => navigate('/incidencias')}>
            Ver incidencias
          </button>
          <button className="btn btn-secondary btn-lg rounded-pill px-4" onClick={() => navigate('/registrar')}>Registrar incidencia</button>
          <button className="btn btn-dark btn-lg rounded-pill px-4" onClick={() => navigate('/')}>
            Cerrar sesión
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
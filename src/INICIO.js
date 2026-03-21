import React from 'react';

export default function Inicio() {

  return (
    <div className="vh-100 d-flex flex-column">
      <header className="bg-dark text-white p-3 shadow">
        <div className="container"><strong>Página Usuario Común</strong></div>
      </header>

      <main className="flex-grow-1 d-flex flex-column justify-content-center align-items-center px-4">
        <h2 className="display-5 mb-5 text-center">Bienvenido a la página de incidencias</h2>
        <div className="d-flex flex-wrap justify-content-center gap-3">

          <button className="btn btn-secondary btn-lg rounded-pill px-4 shadow-sm">Ver incidencias</button>
          <button className="btn btn-secondary btn-lg rounded-pill px-4 shadow-sm">Registrar incidencia</button>
          
          <button className="btn btn-dark btn-lg rounded-pill px-4 shadow-sm" onClick={() => window.location.href='/'}>
            Cerrar sesión
          </button>

        </div>
      </main>

      <footer className="bg-dark text-white p-3 mt-auto text-end">
        <strong>GRUPO 3</strong>
      </footer>
    </div>
  );
}
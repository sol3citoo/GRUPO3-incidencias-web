import React from 'react';
import { useNavigate } from 'react-router-dom';
import datos from './BD/incidencias.json';
import Footer from './componentes/Footer';
import Header from './componentes/Header';

export default function Incidencias() {
  const navigate = useNavigate();

  const volverAlInicio = () => {
    const rol = localStorage.getItem('usuarioRol');
    if (rol === "admin") {
      navigate('/admin');
    } else {
      navigate('/inicio');
    }
  };

  const lista = datos && datos.incidencias ? datos.incidencias : [];

  return (
    <div className="vh-100 d-flex flex-column bg-white">
      <Header />
      <main className="flex-grow-1 container mt-4">
        <div className="d-flex justify-content-center gap-3 mb-5">
          <button className="btn btn-secondary btn-lg rounded-pill px-4 shadow-sm" onClick={volverAlInicio}>
            Inicio
          </button>
          <button className="btn btn-secondary btn-lg rounded-pill px-4 shadow-sm" onClick={() => navigate('/registrar')}>
            Registrar Incidencia
          </button>
          <button className="btn btn-danger btn-lg rounded-pill px-4 shadow-sm text-white" onClick={() => { localStorage.clear(); navigate('/'); }}>
            Cerrar sesión
          </button>
        </div>

        <div className="table-responsive shadow-sm">
          <table className="table table-bordered align-middle">
            <thead className="table-primary text-center">
              <tr>
                <th>Id</th><th>Título</th><th>Usuario</th><th>Urgencia</th><th>Ubicación</th><th>Estado</th><th>Fecha registro</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {lista.map((item) => (
                <tr key={item.id}>
                  <td className="fw-bold">{item.id}</td>
                  <td className="text-start">{item.titulo}</td>
                  <td>{item.usuario}</td>
                  <td>{item.urgencia}</td>
                  <td>{item.ubicacion}</td>
                  <td>{item.estado}</td>
                  <td>{item.fecha}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      <Footer />
    </div>
  );
}
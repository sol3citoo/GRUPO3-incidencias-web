import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import datos from '../BD/incidencias.json';
import Footer from '../componentes/Footer';
import Header from '../componentes/Header';
import { getIncidencias } from '../BD/service/IncidenciaService';

export default function Incidencias() {
  const navigate = useNavigate();

  const [incidencias, setIncidencias] = useState([]);

  useEffect(() => {
    const fetchIncidencias = async () => {
      setIncidencias(await getIncidencias());
    };

    fetchIncidencias();
  }, []);


  return (
    <div className="vh-100 d-flex flex-column bg-white">
      <Header />
      <main className="flex-grow-1 container mt-4">
        <div className="d-flex justify-content-center gap-3 mb-5">
          <button className="btn btn-secondary btn-lg rounded-pill px-4 shadow-sm" onClick={() => navigate('/')}>
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
              {incidencias.map((item) => (
                <tr key={item.Id}>
                  <td className="fw-bold">{item.Id}</td>
                  <td className="text-start">{item.Titulo}</td>
                  <td>{item.Creador}</td>
                  <td>{item.Urgencia}</td>
                  <td>{item.Ubicacion}</td>
                  <td>{item.Estado}</td>
                  <td>{new Date(item.Fecha).toLocaleDateString()}</td>
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
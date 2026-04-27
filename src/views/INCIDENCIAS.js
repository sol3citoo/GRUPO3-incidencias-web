import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import datos from '../BD/incidencias.json';
import Footer from '../componentes/Footer';
import Header from '../componentes/Header';
import { getIncidencias, getEstados, cambiarEstado } from '../BD/service/IncidenciaService';
import { isAdmin } from '../BD/service/AuthService';

export default function Incidencias() {
  const navigate = useNavigate();

  const [estados, setEstados] = useState([]);
  const [incidencias, setIncidencias] = useState([]);
  const [admin, setAdmin] = useState(false);

  const [filter, setFilter] = useState({
    estados: [],
    urgencias: [],
    ubicaciones: [],
    fecha: null
  });

  useEffect(() => {
    const fetchIncidencias = async () => {
      setIncidencias(await getIncidencias());
      setEstados(await getEstados());
      setAdmin(await isAdmin());
    };

    fetchIncidencias();
  }, []);

  const manejarCambio = async (incidencia, estado) => {
    await cambiarEstado(incidencia, estado);

    setIncidencias(await getIncidencias(true));
  };


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
                <th>Id</th>
                <th>Título</th>
                <th>Usuario</th>
                <div>
                  <th>Urgencia</th>

                  <select 
                  value={filter.urgencias}>

                  </select>
                </div>
                <th>Ubicación</th>
                <th>Estado</th>
                <th>Fecha registro</th>
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
                  {item.Estado === "Resuelta" && !admin ? <td className="form-control form-control-lg">{item.Estado}</td> :
                    <select
                      className="form-control form-control-lg"
                      onChange={(e) => manejarCambio(item, e.target.value)}
                      value={item.Estado}
                      required
                    >
                      {estados.filter((estado) => estado.Estado !== "Resuelta" || admin).map((estado, index) => (
                        <option key={index} value={estado.Estado}>{estado.Estado}</option>
                      ))}
                    </select>}
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
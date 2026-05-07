import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import datos from '../BD/incidencias.json';
import Footer from '../componentes/Footer';
import Header from '../componentes/Header';
import { getIncidencias, getEstados, cambiarEstado, getUrgencias, getUbicaciones, getIncidenciasWithfilter, cambiarAbierto } from '../BD/service/IncidenciaService';
import { isAdmin } from '../BD/service/AuthService';

export default function Incidencias() {
  const navigate = useNavigate();

  const [estados, setEstados] = useState([]);
  const [incidencias, setIncidencias] = useState([]);
  const [admin, setAdmin] = useState(false);
  const [urgencias, setUrgencias] = useState([]);
  const [ubicaciones, setUbicaciones] = useState([]);

  const [filter, setFilter] = useState({
    estados: [],
    urgencias: [],
    ubicaciones: [],
    fecha: null,
    abierto: null
  });

  useEffect(() => {
    async function fetchdata() {
      console.log(filter)

      setIncidencias(await getIncidenciasWithfilter(filter));
    }

    fetchdata();
  }, [filter])

  useEffect(() => {
    const fetchIncidencias = async () => {
      setIncidencias(await getIncidencias());
      setEstados(await getEstados());
      setAdmin(await isAdmin());
      setUrgencias(await getUrgencias());
      setUbicaciones(await getUbicaciones());
    };

    fetchIncidencias();
  }, []);

  const manejarCambioEstado = async (incidencia, estado) => {
    await cambiarEstado(incidencia, estado);

    setIncidencias(await getIncidencias(true));
  };

  const manejarCambioAbierto = async (incidencia, abierto) => {
    await cambiarAbierto(incidencia, abierto);

    setIncidencias(await getIncidencias(true));
  }

  /*const cambioFilter = async (filter) => {
    console.log(filter)

    setIncidencias(await getIncidenciasWithfilter(filter));
  }*/


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
                <th>Urgencia</th>
                <th>Ubicación</th>
                <th>Estado</th>
                <th>Fecha registro</th>
                <th></th>
              </tr>

              {/* FILA DE FILTROS */}
              <tr>
                <th></th>
                <th></th>
                <th></th>

                {/* Filtro urgencia */}
                <th>
                  <select
                    className="form-select"
                    multiple
                    value={filter.urgencias}
                    onChange={(e) => {
                      setFilter({
                        ...filter,
                        urgencias: Array.from(e.target.selectedOptions, opt => opt.value)
                      })
                    }}
                  >
                    {urgencias.map((u, i) => (
                      <option key={i} value={u.Urgencia}>{u.Urgencia}</option>
                    ))}
                  </select>
                </th>

                {/* Filtro ubicación */}
                <th>
                  <select
                    className="form-select"
                    multiple
                    value={filter.ubicaciones}
                    onChange={(e) => {
                      setFilter({
                        ...filter,
                        ubicaciones: Array.from(e.target.selectedOptions, opt => opt.value)
                      })

                      console.log(filter)
                    }}
                  >
                    {ubicaciones.map((ubicacion, i) => (
                      <option key={i} value={ubicacion.Nombre}>{ubicacion.Nombre}</option>
                    ))}
                  </select>
                </th>

                {/* Filtro estado */}
                <th>
                  <select
                    className="form-select"
                    multiple
                    value={filter.estados}
                    onChange={(e) => {
                      setFilter({
                        ...filter,
                        estados: Array.from(e.target.selectedOptions, opt => opt.value)
                      })
                    }}
                  >
                    {estados.map((estado, i) => (
                      <option key={i} value={estado.Estado}>{estado.Estado}</option>
                    ))}
                  </select>
                </th>

                {/* Filtro fecha */}
                <th>
                  <input
                    type="date"
                    className="form-control"
                    value={filter.fecha ?? ""}
                    onChange={(e) => {
                      setFilter({
                        ...filter,
                        fecha: e.target.value
                      })
                    }}
                  />
                </th>
                <th>
                  <select
                    className="form-select"
                    multiple
                    value={filter.abierto}
                    onChange={(e) => {
                      setFilter({
                        ...filter,
                        abierto: e.target.value
                      })
                    }}>

                    <option value={1}>Abierta</option>
                    <option value={0}>Cerrada</option>
                  </select>
                </th>
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
                      onChange={(e) => manejarCambioEstado(item, e.target.value)}
                      value={item.Estado}
                      required
                    >
                      {estados.filter((estado) => estado.Estado !== "Resuelta" || admin).map((estado, index) => (
                        <option key={index} value={estado.Estado}>{estado.Estado}</option>
                      ))}
                    </select>}
                  <td>{new Date(item.Fecha).toLocaleDateString()}</td>

                  {!admin ? <td className="text-success">{item.Abierto === 1 ? 'Sí' : 'No'}</td> :
                   <select
                      className="form-control form-control-lg"
                      onChange={(e) => manejarCambioAbierto(item, e.target.value)}
                      value={item.Abierto}
                      required>

                      <option value={1}>Abierta</option>
                      <option value={0}>Cerrada</option>
                    </select>}
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
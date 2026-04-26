import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import datosIncidencias from '../BD/incidencias.json';
import Footer from '../componentes/Footer';
import Header from '../componentes/Header';
import { getCategorias, getUbicaciones, getUrgencias, postIncidencia } from '../BD/service/IncidenciaService';

export default function Registrar() {
  const navigate = useNavigate();

  const [categorias, setCategorias] = useState([]);
  const [ubicaciones, setUbicaciones] = useState([]);
  const [urgencias, setUrgencias] = useState([]);

  useEffect(() => {
    const fetchOptions = async () => {
      const categoriasData = await getCategorias();
      const ubicacionesData = await getUbicaciones();
      const urgenciasData = await getUrgencias();
      setCategorias(categoriasData);
      setUbicaciones(ubicacionesData);
      setUrgencias(urgenciasData);
    };

    fetchOptions();
  }, []);


  const [form, setForm] = useState({
    titulo: '',
    descripcion: '',
    categoria: '',
    urgencia: '',
    ubicacion: ''
  });

  const manejarCambio = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const manejarEnvio = (e) => {
    e.preventDefault();

    const nuevaIncidencia = {
      titulo: form.titulo,
      descripcion: form.descripcion,
      categoriaId: form.categoria,
      urgencia: form.urgencia,
      ubicacionId: form.ubicacion
    };

    postIncidencia(nuevaIncidencia);
    navigate('/incidencias');
  };

  return (
    <div className="vh-100 d-flex flex-column bg-white">
      <Header />

      <main className="flex-grow-1 container mt-5 d-flex flex-column align-items-center">
        <h1 className="display-4 fw-normal mb-1">Registrar Incidencia</h1>
        <p className="text-muted mb-5">Completa los campos para registrar la incidenia</p>

        <form onSubmit={manejarEnvio} className="w-100" style={{ maxWidth: '400px' }}>
          <input
            name="titulo"
            className="form-control form-control-lg border-dark mb-3 shadow-sm"
            placeholder="Título"
            onChange={manejarCambio}
            required
          />

          <textarea
            name="descripcion"
            className="form-control form-control-lg border-dark mb-3 shadow-sm"
            placeholder="Descripción"
            rows="2"
            onChange={manejarCambio}
            required
          ></textarea>
          
          <select
            name="categoria"
            className="form-control form-control-lg border-dark mb-3 shadow-sm"//"form-select mb-4 border-dark shadow-sm"
            onChange={manejarCambio}
            value={form.categoria}
            required
          >
            <option value="" disabled>Selecciona una categoría...</option>
            {categorias.map((categoria, index) => (
              <option key={index} value={categoria.Id}>{categoria.Nombre}</option>
            ))}
          </select>
          
          <select
            name="urgencia"
            className="form-control form-control-lg border-dark mb-3 shadow-sm"//"form-select mb-4 border-dark shadow-sm"
            onChange={manejarCambio}
            value={form.urgencia}
            required
          >
            <option value="" disabled>Selecciona una urgencia...</option>
            {urgencias.map((urgencia, index) => (
              <option key={index} value={urgencia.Urgencia}>{urgencia.Urgencia}</option>
            ))}
          </select>
          
          <select
            name="ubicacion"
            className="form-control form-control-lg border-dark mb-3 shadow-sm"//"form-select mb-4 border-dark shadow-sm"
            onChange={manejarCambio}
            value={form.ubicacion}
            required
          >
            <option value="" disabled>Selecciona una ubicación...</option>
            {ubicaciones.map((ubicacion, index) => (
              <option key={index} value={ubicacion.Id}>{ubicacion.Nombre}</option>
            ))}
          </select>

          <div className="d-flex justify-content-center gap-3">
            <button
              type="button"
              className="btn btn-secondary btn-lg rounded-pill px-5 shadow-sm text-white"
              onClick={() => navigate('/incidencias')}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn btn-secondary btn-lg rounded-pill px-5 shadow-sm text-white"
            >
              Agregar
            </button>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
}
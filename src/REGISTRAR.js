import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import datosIncidencias from './BD/incidencias.json';
import Footer from './componentes/Footer';
import Header from './componentes/Header';

export default function Registrar() {
  const navigate = useNavigate();

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
    const nombreGuardado = localStorage.getItem('usuarioNombre') || "Usuario";

    const nuevaIncidencia = {
      id: String(datosIncidencias.incidencias.length + 1).padStart(2, '0'),
      titulo: form.titulo,
      usuario: nombreGuardado,
      urgencia: form.urgencia,
      ubicacion: form.ubicacion,
      estado: "Abierta",
      fecha: new Date().toLocaleDateString()
    };

    datosIncidencias.incidencias.push(nuevaIncidencia);
    alert("Incidencia agregada correctamente");
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

          <input
            name="categoria"
            className="form-control form-control-lg border-dark mb-3 shadow-sm"
            placeholder="Categoría"
            onChange={manejarCambio}
            required
          />

          <input
            name="urgencia"
            className="form-control form-control-lg border-dark mb-3 shadow-sm"
            placeholder="Nivel Urgencia"
            onChange={manejarCambio}
            required
          />

          <input
            name="ubicacion"
            className="form-control form-control-lg border-dark mb-5 shadow-sm"
            placeholder="Ubicación"
            onChange={manejarCambio}
            required
          />

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
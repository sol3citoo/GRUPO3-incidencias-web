import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import data from './BD/usuarios.json';

export default function Login() {
  const [form, setForm] = useState({ correo: '', password: '' });
  const navigate = useNavigate();

  const entrar = (e) => {
    e.preventDefault();
    const user = data.usuarios.find(u => u.correo === form.correo && u.password === form.password);
    if (user) {
      user.rol === "admin" ? navigate('/admin') : navigate('/inicio');
    } else {
      alert("Credenciales incorrectas");
    }
  };

  const cambio = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div className="vh-100 d-flex flex-column">
      <header className="bg-dark text-white p-3 shadow">
        <div className="container"><strong>Página de Incidencias</strong></div>
      </header>

      <main className="flex-grow-1 d-flex flex-column justify-content-center align-items-center">

        <h1 className="display-4 mb-5 fw-normal">Iniciar sesión</h1>
        
        <form onSubmit={entrar} className="d-flex flex-wrap justify-content-center gap-3">

          <input 
            name="correo" 
            className="form-control form-control-lg w-auto" 
            placeholder="Correo" 
            onChange={cambio} 
            required 
          />
          <input 
            name="password" 
            type="password" 
            className="form-control form-control-lg w-auto" 
            placeholder="Contraseña" 
            onChange={cambio} 
            required 
          />
          <button className="btn btn-secondary btn-lg rounded-pill px-5 shadow-sm">
            Entrar
          </button>

        </form>

      </main>

      <footer className="bg-dark text-white p-3 mt-auto text-end">
        <strong>GRUPO 3</strong>
      </footer>
    </div>
  );
}
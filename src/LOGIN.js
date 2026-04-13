import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import data from './BD/usuarios.json';
import Header from './componentes/Header';
import Footer from './componentes/Footer';

export default function Login() {
  const [form, setForm] = useState({ correo: '', password: '' });
  const navigate = useNavigate();

  const entrar = (e) => {
    e.preventDefault();
    const user = data.usuarios.find(u => u.correo === form.correo && u.password === form.password);
    
    if (user) {
      //GUARDAR INFORMACIÓN PARA PODER VOLVER A LA PAGINA DE INICIO UNA VEZ ACCEDIDO
      localStorage.setItem('usuarioNombre', user.correo.split('@')[0]);
      localStorage.setItem('usuarioRol', user.rol);
      
      if (user.rol === "admin") {
        navigate('/admin');
      } else {
        navigate('/inicio');
      }
    } else {
      alert("Credenciales incorrectas");
    }
  };

  const cambio = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div className="vh-100 d-flex flex-column bg-light">
      <Header></Header>

      <main className="flex-grow-1 d-flex flex-column justify-content-center align-items-center">
        <h1 className="display-4 mb-5 fw-bold">Iniciar sesión</h1>

        <form onSubmit={entrar} className="d-flex gap-3 bg-white p-4 shadow-sm rounded">

          <input name="correo" className="form-control form-control-lg" placeholder="Correo" onChange={cambio} required />
          <input name="password" type="password" className="form-control form-control-lg" placeholder="Contraseña" onChange={cambio} required />
          <button className="btn btn-secondary btn-lg rounded-pill px-5">Entrar</button>

        </form>
      </main>

      <Footer />
    </div>
  );
}
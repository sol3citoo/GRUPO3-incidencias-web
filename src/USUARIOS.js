import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import datosUsuarios from './BD/usuarios.json';
import Footer from './componentes/Footer';
import Header from './componentes/Header';
import { Link } from 'react-router-dom';

export default function Usuarios() {
  const navigate = useNavigate();

  const [lista, setLista] = useState(datosUsuarios.usuarios);

  const [form, setForm] = useState({
    nombre: '',
    apellidos: '',
    email: '',
    password: '',
    rol: ''
  });

  const vaciarForm = () => {
    console.log("Formulario vaciado");
    setForm({ nombre: '', apellidos: '', email: '', password: '', rol: '' });
  };

  const manejarCambio = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const agregarUsuario = (e) => {
    e.preventDefault();

    const nuevoUsuario = {
      correo: form.email,
      password: form.password,
      rol: form.rol
    };

    datosUsuarios.usuarios.push(nuevoUsuario);
    setLista([...datosUsuarios.usuarios]);

    alert(`Usuario ${form.nombre} registrado con éxito`);
    setForm({ nombre: '', apellidos: '', email: '', password: '', rol: '' });
    e.target.reset();
  };

  const cambiarRol = (index) => {
    const nuevaLista = [...lista];
    nuevaLista[index].rol = nuevaLista[index].rol === 'admin' ? 'comun' : 'admin';
    setLista(nuevaLista);
  };

  const eliminarUsuario = (index) => {
    const confirmar = window.confirm("¿Estás seguro de que deseas eliminar este usuario?");
    if (confirmar) {
      const nuevaLista = [...lista];
      nuevaLista.splice(index, 1);
      setLista(nuevaLista);
      datosUsuarios.usuarios = nuevaLista;
    }
  };

  return (
    <div className="vh-100 d-flex flex-column bg-white">

      <Header />

      <main className="container-fluid mt-4 px-5">
        <div className="row g-5">

          <div className="col-md-7 border-end">
            <div className="table-responsive" style={{ maxHeight: '500px' }}>
              <table className="table table-sm table-hover border">
                <thead className="table-light text-center">
                  <tr>
                    <th className="text-start">Usuario</th>
                    <th>Rol</th>
                    <th>Cambio rol</th>
                    <th>Acción</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {lista.map((u, index) => (
                    <tr key={index}>
                      <td className="py-2 text-start small">{u.correo}</td>
                      <td>
                        <span className={`badge ${u.rol === 'admin' ? 'bg-dark' : 'bg-secondary'}`}>
                          {u.rol}
                        </span>
                      </td>
                      <td>
                        <button className="btn btn-outline-dark btn-sm" onClick={() => cambiarRol(index)}>
                          Cambiar
                        </button>
                      </td>
                      <td>
                        <button className="btn btn-danger btn-sm" onClick={() => eliminarUsuario(index)}>
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="col-md-5 text-center px-lg-4">
            <h2 className="display-6 mb-1">Registrar usuario</h2>
            <p className="text-muted mb-4 small">Todos los campos son obligatorios</p>

            <form onSubmit={agregarUsuario} className="text-start">
              <input name="nombre" className="form-control mb-3 border-dark" placeholder="Nombre" value={form.nombre} onChange={manejarCambio} required />
              <input name="apellidos" className="form-control mb-3 border-dark" placeholder="Apellidos" value={form.apellidos} onChange={manejarCambio} required />
              <input name="email" type="email" className="form-control mb-3 border-dark" placeholder="Email" value={form.email} onChange={manejarCambio} required />
              <input name="password" type="password" className="form-control mb-3 border-dark" placeholder="Contraseña" value={form.password} onChange={manejarCambio} required />

              <select
                name="rol"
                className="form-select mb-4 border-dark shadow-sm"
                onChange={manejarCambio}
                value={form.rol}
                required
              >
                <option value="" disabled>Selecciona un rol...</option>
                <option value="admin">Admin</option>
                <option value="comun">Común</option>
              </select>

              <div className="d-flex justify-content-center gap-2">
                <button type="button" className="btn btn-secondary btn-lg rounded-pill px-4 fs-6" onClick={() => navigate('/admin')}>
                  Inicio
                </button>
                <button type="button" className="btn btn-secondary btn-lg rounded-pill px-4 fs-6" onClick={vaciarForm}>
                  Cancelar
                </button>
                <button type="submit" className="btn btn-secondary btn-lg rounded-pill px-4 fs-6">
                  Agregar
                </button>
              </div>
            </form>
          </div>

        </div>
      </main>

      <Footer />

    </div>
  );
}
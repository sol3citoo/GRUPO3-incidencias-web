import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import datosUsuarios from '../BD/usuarios.json';
import Footer from '../componentes/Footer';
import Header from '../componentes/Header';
import { Link } from 'react-router-dom';
import { getUsers, register, roles, eliminarUsuario } from '../BD/service/AuthService';
  
export default function Usuarios() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [rolesOpciones, setRolesOpciones] = useState([]);

  useEffect(() => {
    const cargarUsuarios = async () => {
      const fetchedUsers = await getUsers();
      const fetchedRoles = await roles;

      setUsers(fetchedUsers);
      setRolesOpciones(fetchedRoles);
    };

    cargarUsuarios();
  }, []);

  const [form, setForm] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: '',
    rol: ''
  });

  const vaciarForm = () => {
    console.log("Formulario vaciado");
    setForm({ nombre: '', email: '', password: '', confirmPassword: '', rol: '' });
  };

  const manejarCambio = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const agregarUsuario = (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    const nuevoUsuario = {
      nombre: form.nombre,
      email: form.email,
      contraseña: form.password,
      rolId: form.rol
    };

    console.log("Nuevo usuario a registrar:", nuevoUsuario);

    register(nuevoUsuario);
  };

  const cambiarRol = (index) => {
    const nuevaLista = [...users];
    nuevaLista[index].RolId = nuevaLista[index].RolId === 1 ? 2 : 1;
    setUsers(nuevaLista);
  };

  const borrarUsuario = (index) => {
    const confirmar = window.confirm("¿Estás seguro de que deseas eliminar este usuario?");
    if (confirmar) {
      eliminarUsuario(index);
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
                    <th className="text-start">Nombre</th>
                    <th className="text-start">Email</th>
                    <th>Rol</th>
                    <th>Cambio rol</th>
                    <th>Acción</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {users.map((u, index) => (
                    <tr key={index}>
                      <td className="py-2 text-start small">{u.Nombre}</td>
                      <td className="py-2 text-start small">{u.Email}</td>
                      <td>
                        <span className={`badge ${u.Rol === 'Admin' ? 'bg-dark' : 'bg-secondary'}`}>
                          {u.Rol}
                        </span>
                      </td>
                      <td>
                        <button className="btn btn-outline-dark btn-sm" onClick={() => cambiarRol(u.Id)}>
                          Cambiar
                        </button>
                      </td>
                      <td>
                        <button className="btn btn-danger btn-sm" onClick={() => borrarUsuario(u.Id)}>
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
              <input name="email" type="email" className="form-control mb-3 border-dark" placeholder="Email" value={form.email} onChange={manejarCambio} required />
              <input name="password" type="password" className="form-control mb-3 border-dark" placeholder="Contraseña" value={form.password} onChange={manejarCambio} required />
              <input name="confirmPassword" type="password" className="form-control mb-3 border-dark" placeholder="Confirmar contraseña" value={form.confirmPassword} onChange={manejarCambio} required />

              <select
                name="rol"
                className="form-select mb-4 border-dark shadow-sm"
                onChange={manejarCambio}
                value={form.rol}
                required
              >
                <option value="" disabled>Selecciona un rol...</option>
                {rolesOpciones.map((rol, index) => (
                  <option key={index} value={rol.Id}>{rol.Nombre}</option>
                ))}
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
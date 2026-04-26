import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../componentes/Header';
import Footer from '../componentes/Footer';
import { logout, isAdmin } from '../BD/service/AuthService';

export default function Incio() {
  const navigate = useNavigate();

  const [admin, setAdmin] = useState(false);




  useEffect(() => {
    const checkAdminStatus = async () => {
      const adminStatus = await isAdmin();

      console.log("Admin status:", adminStatus);

      setAdmin(adminStatus);
    };
    checkAdminStatus();
  }, []);

  return (
    <div className="vh-100 d-flex flex-column bg-light">
      <Header />

      <main className="flex-grow-1 d-flex flex-column justify-content-center align-items-center">
        <h2 className="display-5 mb-5">Bienvenido a la página de incidencias</h2>

        <div className="d-flex gap-3">
          <button className="btn btn-secondary btn-lg rounded-pill px-4" onClick={() => navigate('/incidencias')}>
            Ver incidencias
          </button>
          <button className="btn btn-secondary btn-lg rounded-pill px-4" onClick={() => navigate('/registrar')}>Registrar incidencia</button>

          {//FIX: Esto no se actualiza al cambiar el rol
          admin && (
            <button className="btn btn-secondary btn-lg rounded-pill px-4" onClick={() => navigate('/usuarios')}>
              Gestión de usuarios/roles
            </button>
          )}

          <button className="btn btn-dark btn-lg rounded-pill px-4" onClick={() => { logout(); navigate('/login') }}>
            Cerrar sesión
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
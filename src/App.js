import React, { use, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import LOGIN from './views/LOGIN';
import INICIO from './views/INICIO';
import ADMIN from './views/ADMIN';
import INCIDENCIAS from './views/INCIDENCIAS';
import REGISTRAR from './views/REGISTRAR';
import USUARIOS from './views/USUARIOS';
import { getUser } from './BD/service/AuthService';


function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      setUser(await getUser());
    }

    fetchUser();
  }, [])

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LOGIN setUser={setUser} />} />
        <Route path="/" element={user ? <INICIO /> : <LOGIN setUser={setUser} />} />
        <Route path="/admin" element={user ? <ADMIN /> : <LOGIN setUser={setUser} />} />
        <Route path="/incidencias" element={user ? <INCIDENCIAS /> : <LOGIN setUser={setUser} />} />
        <Route path="/registrar" element={user ? <REGISTRAR /> : <LOGIN setUser={setUser} />} />
        <Route path="/usuarios" element={user ? <USUARIOS /> : <LOGIN setUser={setUser} />} />
      </Routes>
    </Router>
  );
}

export default App;
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import LOGIN from './views/LOGIN';
import INICIO from './views/INICIO';
import ADMIN from './views/ADMIN';
import INCIDENCIAS from './views/INCIDENCIAS';
import REGISTRAR from './views/REGISTRAR';
import USUARIOS from './views/USUARIOS';
import { getUser } from './BD/service/AuthService';
  
const user = await getUser();

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LOGIN />} />
        <Route path="/" element={user ? <INICIO /> : <LOGIN />} />
        <Route path="/admin" element={user ? <ADMIN /> : <LOGIN />} />
        <Route path="/incidencias" element={user ? <INCIDENCIAS /> : <LOGIN />} />
        <Route path="/registrar" element={user ? <REGISTRAR /> : <LOGIN />} />
        <Route path="/usuarios" element={user ? <USUARIOS /> : <LOGIN />} />
      </Routes>
    </Router>
  );
}

export default App;
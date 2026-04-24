import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import LOGIN from './views/LOGIN';
import INICIO from './views/INICIO';
import ADMIN from './views/ADMIN';
import INCIDENCIAS from './views/INCIDENCIAS';
import REGISTRAR from './views/REGISTRAR';
import USUARIOS from './views/USUARIOS';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LOGIN />} />
        <Route path="/inicio" element={<INICIO />} />
        <Route path="/admin" element={<ADMIN />} />
        <Route path="/incidencias" element={<INCIDENCIAS />} />
        <Route path="/registrar" element={<REGISTRAR />} />
        <Route path="/usuarios" element={<USUARIOS />} />
      </Routes>
    </Router>
  );
}

export default App;
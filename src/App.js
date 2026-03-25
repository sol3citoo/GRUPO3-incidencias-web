import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import LOGIN from './LOGIN';
import INICIO from './INICIO';
import ADMIN from './ADMIN';
import INCIDENCIAS from './INCIDENCIAS';
import REGISTRAR from './REGISTRAR';
import USUARIOS from './USUARIOS'

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
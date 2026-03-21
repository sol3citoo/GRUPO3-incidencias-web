import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import LOGIN from './LOGIN';
import INICIO from './INICIO';
import ADMIN from './ADMIN'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LOGIN />} />
        <Route path="/inicio" element={<INICIO />} />
        <Route path="/admin" element={<ADMIN />} />
      </Routes>
    </Router>
  );
}

export default App;
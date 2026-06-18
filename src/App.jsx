// src/App.jsx
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Grupos from './pages/Grupos';
import Cronograma from './pages/Cronograma';
import Login from './pages/Login';
import Materiais from './pages/Materiais'; 

function AppContent() {
  const location = useLocation();
  
  // Verifica se a rota atual é a de login
  const isLoginPage = location.pathname === '/login';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      {!isLoginPage && <Header />}
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/grupos" element={<Grupos />} />
          <Route path="/cronograma" element={<Cronograma />} />
          <Route path="/login" element={<Login />} />
          
          <Route path="/materiais" element={<Materiais />} />
        </Routes>
      </main>

      {!isLoginPage && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
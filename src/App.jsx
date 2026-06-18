import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Grupos from './pages/Grupos';
import Cronograma from './pages/Cronograma';
import Login from './pages/Login';

// Criamos um componente interno para gerenciar o layout
function AppContent() {
  const location = useLocation();
  
  // Verifica se a rota atual é a de login
  const isLoginPage = location.pathname === '/login';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      {/* O Header só renderiza se NÃO for a página de login */}
      {!isLoginPage && <Header />}
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/grupos" element={<Grupos />} />
          <Route path="/cronograma" element={<Cronograma />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>

      {/* O Footer só renderiza se NÃO for a página de login */}
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
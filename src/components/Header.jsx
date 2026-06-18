// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // 1. IMPORTAR O COMPONENTE LINK

const Header = () => {
  return (
    // Define a largura total para o cabeçalho
    <header className="w-full font-sans">
      
      {/* Parte Superior: Azul REAGE - justify-between para espalhar os 3 blocos principais */}
      <div className="bg-reage-blue h-20 flex items-center justify-between px-8 text-white">
        
        {/* Bloco 1: Logo (Lado Esquerdo) */}
        <div className="flex-1"> {/* flex-1 ocupa espaço igual para ajudar a centralizar o vizinho */}
          <Link to="/"> {/* Clicar no logo também volta para a Home */}
            <h1 className="text-2xl font-bold tracking-tighter cursor-pointer">REAGE</h1>
          </Link>
        </div>

        {/* Bloco 2: Barra de Pesquisa (Centralizada e Maior) */}
        <div className="flex-[2] flex justify-center"> {/* flex-[2] faz este bloco ser o dobro dos outros, garantindo o centro */}
          <div className="relative w-full max-w-xl"> {/* max-w-xl aumenta o tamanho da barra horizontalmente */}
            <input 
              type="text" 
              placeholder="Pesquisar grupos de estudo..." 
              className="w-full bg-white/20 placeholder-white/70 rounded-full py-2 px-6 focus:outline-none focus:bg-white focus:text-reage-dark transition-all shadow-inner"
            />
          </div>
        </div>

        {/* Bloco 3: Perfil / Login (Lado Direito) */}
        <div className="flex-1 flex justify-end">
          {/* USANDO O LINK PARA IR PARA A TELA DE LOGIN */}
          <Link 
            to="/login" 
            className="flex items-center gap-2 cursor-pointer bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors"
          >
            <span className="text-sm font-medium">👤 LOGIN</span>
          </Link>
        </div>
      </div>

      {/* Parte Inferior: Menu Amarelo REAGE */}
      <nav className="bg-reage-yellow h-12 flex items-center justify-center px-8 shadow-md">
        {/* justify-center centraliza a lista; gap-12 aumenta o espaçamento entre os itens */}
        <ul className="flex gap-12 text-reage-dark font-semibold text-sm">
          
          {/* TROCAMOS CADA ITEM POR UM COMPONENTE LINK */}
          <li className="hover:scale-105 transition-transform">
            <Link to="/" className="hover:underline block py-1">
              Home
            </Link>
          </li>
          
          <li className="hover:scale-105 transition-transform">
            <Link to="/grupos" className="hover:underline block py-1 font-bold">
              Grupos
            </Link>
          </li>
          
          <li className="hover:scale-105 transition-transform">
            <Link to="/cronograma" className="hover:underline block py-1">
              Cronograma
            </Link>
          </li>
          
          <li className="hover:scale-105 transition-transform">
            <Link to="/materiais" className="hover:underline block py-1">
              Materiais
            </Link>
          </li>
          
          <li className="hover:scale-105 transition-transform">
            <Link to="/sobre" className="hover:underline block py-1">
              Sobre
            </Link>
          </li>
          
        </ul>
      </nav>
    </header>
  );
};

export default Header;
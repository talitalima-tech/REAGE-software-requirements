// src/components/Header.jsx
import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className="w-full font-sans">
      <div className="bg-reage-blue h-20 flex items-center justify-between px-8 text-white">
        <div className="flex-1"> 
          <Link to="/"> 
            <h1 className="text-2xl font-bold tracking-tighter cursor-pointer">REAGE</h1>
          </Link>
        </div>

        <div className="flex-[2] flex justify-center"> 
          <div className="relative w-full max-w-xl"> 
            <input 
              type="text" 
              placeholder="Pesquisar grupos de estudo..." 
              className="w-full bg-white/20 placeholder-white/70 rounded-full py-2 px-6 focus:outline-none focus:bg-white focus:text-reage-dark transition-all shadow-inner"
            />
          </div>
        </div>

        <div className="flex-1 flex justify-end">
          <Link 
            to="/login" 
            className="flex items-center gap-2 cursor-pointer bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors"
          >
            <span className="text-sm font-medium">👤 LOGIN</span>
          </Link>
        </div>
      </div>

      <nav className="bg-reage-yellow h-12 flex items-center justify-center px-8 shadow-md">
        <ul className="flex gap-12 text-reage-dark font-semibold text-sm">
          {[
            { name: 'Home', path: '/' },
            { name: 'Grupos', path: '/grupos' },
            { name: 'Cronograma', path: '/cronograma' },
            { name: 'Materiais', path: '/materiais' },
            { name: 'Sobre', path: '/sobre' }
          ].map((item) => (
            <li key={item.path} className="hover:scale-105 transition-transform">
              <NavLink 
                to={item.path} 
                className={({ isActive }) => 
                  `block py-1 hover:underline ${isActive ? 'font-black underline border-b-2 border-reage-dark' : 'font-semibold'}`
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
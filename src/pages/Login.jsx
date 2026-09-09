// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff, FiUser, FiLock } from 'react-icons/fi';

const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [lembrar, setLembrar] = useState(false);
  
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (usuario.trim() && senha.trim()) {
      alert("Login realizado com sucesso via SIGAA!");
      navigate('/'); 
    } else {
      alert("Por favor, preencha o usuário e a senha.");
    }
  };

  return (
    <div className="bg-white w-full flex items-center justify-center min-h-[calc(100vh-160px)] py-12 px-4">
      <div className="bg-[#FFE388] p-8 sm:p-10 rounded-[20px] shadow-md w-full max-w-xl mx-auto flex flex-col items-center">
        
        <div className="bg-[#38A9DC] text-white w-full py-3 rounded-xl font-bold text-center text-lg uppercase tracking-wider mb-8 shadow-sm">
          Login com SIGAA
        </div>

        <form className="w-full max-w-md space-y-5" onSubmit={handleLogin}>
          
          {/* CAMPO USUÁRIO */}
          <div className="relative flex items-center bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-[#38A9DC] transition-all">
            <div className="px-4 text-gray-800 flex items-center justify-center border-r border-gray-300">
              <FiUser size={20} />
            </div>
            <input
              id="usuario"
              type="text"
              required
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              className="w-full px-4 py-3.5 bg-white text-gray-800 placeholder-gray-400 focus:outline-none text-base font-medium"
              placeholder="Usuário (Matrícula)"
            />
          </div>

          {/* CAMPO SENHA */}
          <div className="relative flex items-center bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-[#38A9DC] transition-all">
            <div className="px-4 text-gray-800 flex items-center justify-center border-r border-gray-300">
              <FiLock size={20} />
            </div>
            <input
              id="senha"
              type={showPassword ? 'text' : 'password'}
              required
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full px-4 py-3.5 bg-white text-gray-800 placeholder-gray-400 focus:outline-none text-base font-medium"
              placeholder="Senha"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="px-4 text-gray-500 hover:text-gray-800 transition-colors"
              title={showPassword ? "Ocultar senha" : "Exibir senha"}
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>
          </div>

          {/* OPÇÕES */}
          <div className="flex items-center justify-between text-sm font-bold text-gray-900 px-1">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={lembrar}
                onChange={(e) => setLembrar(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-[#38A9DC] focus:ring-[#38A9DC]"
              />
              Lembrar
            </label>
            <button 
              type="button" 
              onClick={() => alert("Sua senha inicial do REAGE é a mesma cadastrada no SIGAA.")}
              className="underline hover:text-gray-700 text-xs font-bold"
            >
              Esqueceu a senha?
            </button>
          </div>

          {/* BOTÃO SUBMIT */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl shadow-md text-lg font-bold text-white bg-[#38A9DC] hover:bg-[#2c91be] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#38A9DC] transition-all uppercase tracking-wider"
            >
              Entrar
            </button>
          </div>
        </form>

        <div className="w-full max-w-md mt-8 border-t border-black/10 pt-6 text-left text-gray-900">
          <h4 className="font-extrabold text-base mb-1">
            É sua primeira vez neste sistema?
          </h4>
          <p className="text-sm font-medium leading-relaxed">
            Para acessar pela primeira vez, basta inserir seu usuário 
            (sua matrícula no SIGAA) e a senha inicial (também sua matrícula no SIGAA).
          </p>
        </div>

      </div>
    </div>
  );
};

export default Login;
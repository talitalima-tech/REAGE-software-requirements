// src/pages/Materiais.jsx
import React, { useState } from 'react';

const Materiais = () => {
  // Lista simulada de arquivos carregados
  const arquivosIniciais = [
    { id: 1, titulo: "Prova Grafos (2024.2)", imagem: "📄" },
    { id: 2, titulo: "AV1 Grafos 2024.2", imagem: "📄" },
    { id: 3, titulo: "Grafos 2024.2", imagem: "📄" },
    { id: 4, titulo: "Prova Grafos - 2024.2", imagem: "📄" },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Banner de Saudação Azul */}
      <div className="bg-[#38A9DC] text-white p-6 rounded-2xl flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-3xl shadow-inner">
            🐷
          </div>
          <div>
            <h2 className="text-xl font-extrabold">Olá, Amanda Laiane!</h2>
            <p className="text-sm opacity-90">Use os filtros para encontrar exatamente o que precisa!</p>
          </div>
        </div>
        <div className="flex gap-4 text-2xl">
          <button className="hover:scale-110 transition-transform">➕</button>
          <button className="hover:scale-110 transition-transform">🔖</button>
        </div>
      </div>

      {/* Barra de Pesquisa e Filtros */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <button className="w-full md:w-48 bg-white border-2 border-gray-800 px-4 py-2.5 rounded-xl font-bold flex justify-between items-center text-sm">
          <span>⚙️ Filtros</span> <span>▼</span>
        </button>
        <div className="relative w-full">
          <input 
            type="text" 
            placeholder="Pesquise por provas, listas, resumos e mais..."
            className="w-full bg-white border-2 border-gray-800 rounded-xl py-2.5 px-6 focus:outline-none focus:ring-2 focus:ring-[#38A9DC] text-sm"
          />
          <span className="absolute right-4 top-3 cursor-pointer">🔍</span>
        </div>
      </div>

      {/* Histórico/Feedback da busca anterior */}
      <div className="flex items-center justify-between bg-slate-50 border border-dashed border-gray-300 rounded-xl p-3 text-xs text-gray-600">
        <p>💡 Resultado da pesquisa anterior para <strong className="text-[#38A9DC] italic">'Prova de Grafos 2024.2'</strong></p>
        <button className="hover:text-black">✕</button>
      </div>

      {/* Grid de Materiais */}
      <div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {arquivosIniciais.map((arq) => (
            <div key={arq.id} className="bg-white border-2 border-gray-100 rounded-2xl p-4 shadow-sm flex flex-col items-center space-y-4 hover:shadow-md transition-shadow">
              {/* Box da imagem da prova (Pode substituir por <img> depois) */}
              <div className="w-full aspect-[3/4] bg-gray-100 rounded-xl border border-gray-200 flex items-center justify-center text-5xl">
                {arq.imagem}
              </div>
              <div className="w-full flex items-center justify-between text-xs font-bold">
                <span className="truncate text-reage-dark">{arq.titulo}</span>
                <button className="text-gray-400 hover:text-black">⋮</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Materiais;
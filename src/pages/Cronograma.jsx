// src/pages/Cronograma.jsx
import React, { useState } from 'react';

const Cronograma = () => {
  const tarefasIniciais = [
    {
      id: 1,
      titulo: "Criação do Seminário de LP",
      data: "Quinta-Feira | 05/06",
      hora: "00:00",
      local: "Sala 01 | Unidade I",
      status: "Pendente"
    },
    {
      id: 2,
      titulo: "Revisão de Requisitos",
      data: "Segunda-Feira | 09/06",
      hora: "14h",
      local: "Biblioteca | Unidade I",
      status: "Pendente"
    },
    {
      id: 3,
      titulo: "Tirar Dúvidas Código POO - Monitoria",
      data: "Segunda-Feira | 23/06",
      hora: "20h",
      local: "Discord",
      status: "Pendente"
    },
    {
      id: 4,
      titulo: "Estruturas em Grafos - Grupo de Ana",
      data: "Quarta-Feira | 25/06",
      hora: "16:20",
      local: "Sala 02 | Unidade I",
      status: "Pendente"
    }
  ];

  const [tarefas, setTarefas] = useState(tarefasIniciais);
  const meses = ["Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
  const [mesAtivo, setMesAtivo] = useState("Junho");

  const alternarStatus = (id) => {
    setTarefas(tarefas.map(t => 
      t.id === id ? { ...t, status: t.status === "Pendente" ? "Concluído" : "Pendente" } : t
    ));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 min-h-[calc(100vh-160px)]">
      
      <div className="bg-reage-blue text-white p-6 rounded-2xl flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center text-2xl">
            👧🏻
          </div>
          <div>
            <h2 className="text-lg font-bold">Olá, Amanda Laine!</h2>
            <p className="text-xs text-blue-100">Acompanhe por aqui seus prazos do semestre</p>
          </div>
        </div>
        <button className="text-xl hover:bg-white/10 p-2 rounded-full transition-all">⋮</button>
      </div>

      <div className="border-b border-gray-200 overflow-x-auto">
        <div className="flex gap-2 pb-1 min-w-max">
          {meses.map((mes) => (
            <button
              key={mes}
              onClick={() => setMesAtivo(mes)}
              className={`px-4 py-2 text-xs font-bold rounded-t-lg transition-all ${
                mesAtivo === mes
                  ? 'bg-reage-blue text-white shadow-sm'
                  : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              {mes === "Junho" ? "Junho 2026" : mes}
            </button>
          ))}
        </div>
      </div>

      {/* Título do Mês Atual */}
      <h3 className="text-center font-bold text-reage-dark text-sm my-4">
        {mesAtivo} de 2026
      </h3>

      {/* 3. LISTA DE TAREFAS */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm divide-y divide-gray-100 overflow-hidden">
        {tarefas.map((tarefa) => (
          <div 
            key={tarefa.id} 
            className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-all"
          >
            {/* Informações da Tarefa */}
            <div className="space-y-1">
              <h4 className="font-bold text-reage-blue text-sm italic">
                {tarefa.titulo}
              </h4>
              <div className="text-[11px] text-gray-500 space-y-0.5">
                <p>📅 {tarefa.data}</p>
                <p>⏰ {tarefa.hora}</p>
                <p>📍 {tarefa.local}</p>
              </div>
            </div>

            {/* Seletor/Botão de Status */}
            <div>
              <button
                onClick={() => alternarStatus(tarefa.id)}
                className={`text-[11px] font-bold px-4 py-1.5 rounded-lg border w-28 transition-all ${
                  tarefa.status === "Pendente"
                    ? 'bg-amber-50 text-amber-600 border-amber-200 hover:bg-amber-100'
                    : 'bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-emerald-100'
                }`}
              >
                {tarefa.status} ▾
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

export default Cronograma;
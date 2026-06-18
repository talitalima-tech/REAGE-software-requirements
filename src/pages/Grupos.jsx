// src/pages/Grupos.jsx
import React, { useState } from 'react';

const Grupos = () => {
  // Estados para controlar o fluxo da aplicação
  // 'menu' = mostra os ícones padrão | 'criar' = formulário | 'buscar' = lista de grupos
  const [abaAtiva, setAbaAtiva] = useState('menu');
  const [grupoSelecionado, setGrupoSelecionado] = useState(null);
  const [mostrarModalSenha, setMostrarModalSenha] = useState(false);
  const [senhaDigitada, setSenhaDigitada] = useState('');

  // Mock de dados baseado no protótipo das capturas de tela
  const listaGrupos = [
    { id: 1, titulo: "Dinâmica de Grafos - Grupo da Ana", materia: "Algoritmos em Grafos", local: "Sala 02", unidade: "Unidade I", hora: "16:20", data: "11/06/2026", senha: "Sim" },
    { id: 2, titulo: "Revisão Pré Prova", materia: "Requisitos de Software", local: "Sala 01", unidade: "Unidade I", hora: "10:00", data: "12/06/2026", senha: "Sim" },
    { id: 3, titulo: "Revisão AV2", materia: "Linguagens de Programação", local: "Auditorio", unidade: "Unidade I", hora: "14:00", data: "14/06/2026", senha: "Não" },
    { id: 4, titulo: "Ajuda pra POO", materia: "Programação Orientada a Objetos", local: "Laboratório 3", unidade: "Unidade I", hora: "15:30", data: "18/06/2026", senha: "Sim" },
  ];

  const handleEntrarNoGrupo = () => {
    alert(`Sucesso! Você entrou no grupo.`);
    setMostrarModalSenha(false);
    setSenhaDigitada('');
    setAbaAtiva('menu');
  };

  return (
    /* CONTÊINER PAI */
    <div className="bg-sky-400 min-h-[calc(100vh-160px)] flex items-center justify-center p-6 bg-cover bg-center">
      
      {/* CARD CENTRAL */}
      <div className="bg-white/80 backdrop-blur-md rounded-[40px] shadow-2xl w-full max-w-5xl flex flex-col md:flex-row overflow-hidden border border-white/20 min-h-[500px]">
        
        {/* --- LADO ESQUERDO: Perfil do Usuário (Fixo) --- */}
        <div className="w-full md:w-[35%] p-8 flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r border-gray-300/50 bg-white/40">
          
          {/* Botão Voltar contextualizado */}
          {abaAtiva !== 'menu' && (
            <button 
              onClick={() => { setAbaAtiva('menu'); setGrupoSelecionado(null); }}
              className="mb-4 text-xs font-bold text-reage-blue hover:underline flex items-center gap-1 self-start"
            >
              ◀ Voltar ao Menu
            </button>
          )}

          {/* Foto de Perfil */}
          <div className="w-24 h-24 rounded-full border-4 border-reage-blue p-1 mb-3 shadow-md">
             <div className="w-full h-full bg-blue-100 rounded-full overflow-hidden flex items-center justify-center">
                <span className="text-3xl">🐷</span>
             </div>
          </div>

          <h2 className="text-lg font-bold text-reage-dark">Amanda Laiane</h2>
          <p className="text-xs text-gray-500 mb-6 font-medium">Engenharia de Software</p>

          {/* Botões de Ação Rápida */}
          <div className="grid grid-cols-2 gap-2 w-full">
            <button 
              onClick={() => setAbaAtiva('criar')}
              className={`py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1 transition-all border ${abaAtiva === 'criar' ? 'bg-reage-blue text-white' : 'bg-reage-dark text-white hover:bg-black'}`}
            >
              <span>+</span> Criar Grupo
            </button>
            <button 
              onClick={() => setAbaAtiva('buscar')}
              className={`py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1 transition-all border ${abaAtiva === 'buscar' ? 'bg-reage-blue text-white border-reage-blue' : 'bg-white border-gray-200 text-reage-dark hover:bg-gray-50'}`}
            >
              <span>🔍</span> Buscar
            </button>
          </div>

          <button 
            onClick={() => setAbaAtiva('menu')}
            className="mt-4 flex items-center gap-2 text-reage-blue font-bold border-2 border-reage-blue/30 px-6 py-2 rounded-xl hover:bg-reage-blue/10 transition-all text-xs w-full justify-center"
          >
            <span>👥</span> Meus Grupos
          </button>
        </div>

        {/* --- LADO DIREITO: Conteúdo Dinâmico --- */}
        <div className="flex-1 p-8 flex flex-col justify-center">
          
          {/* CASO 1: MENU DE OPÇÕES PADRÃO */}
          {abaAtiva === 'menu' && (
            <div>
              <h3 className="text-sm font-black text-reage-dark mb-6 uppercase tracking-wider text-center md:text-left">
                O que você pode fazer aqui?
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <div onClick={() => setAbaAtiva('criar')}><MenuOption icon="💬" label="Trocar mensagens" /></div>
                <div><MenuOption icon="🔔" label="Receber lembretes" /></div>
                <div onClick={() => setAbaAtiva('criar')}><MenuOption icon="⚙️" label="Criar seu próprio grupo" /></div>
                <div onClick={() => setAbaAtiva('buscar')}><MenuOption icon="🔖" label="Ver seus grupos salvos" /></div>
                <div onClick={() => setAbaAtiva('buscar')}><MenuOption icon="🔍" label="Buscar grupos de amigos" /></div>
                <div><MenuOption icon="⭐" label="Marcar favoritos" /></div>
              </div>
            </div>
          )}

          {/* CASO 2: FORMULÁRIO DE CRIAR GRUPO (Captura de tela 2026-06-18 155952.png) */}
          {abaAtiva === 'criar' && (
            <div className="animate-fade-in">
              <h3 className="text-xs font-black bg-reage-dark text-white px-4 py-1.5 rounded-md inline-block uppercase tracking-wider mb-6 mx-auto md:mx-0">
                Criar Grupo
              </h3>
              
              <form className="grid grid-cols-1 lg:grid-cols-12 gap-4" onSubmit={(e) => { e.preventDefault(); setAbaAtiva('buscar'); }}>
                {/* Calendário Simplificado (Lado Esquerdo do Form) */}
                <div className="lg:col-span-5 bg-white border border-gray-200 rounded-xl p-3 text-center shadow-sm">
                  <p className="text-[10px] font-bold text-gray-500 mb-2">◀ Junho 2026 ▶</p>
                  <div className="grid grid-cols-7 gap-1 text-[9px] font-bold text-gray-400">
                    <span>D</span><span>S</span><span>T</span><span>Q</span><span>Q</span><span>S</span><span>S</span>
                    <span className="p-1">14</span><span className="p-1">15</span><span className="p-1">16</span><span className="p-1">17</span>
                    <span className="bg-reage-blue text-white rounded p-1">18</span><span className="p-1">19</span><span className="p-1">20</span>
                  </div>
                </div>

                {/* Inputs do Formulário (Lado Direito do Form) */}
                <div className="lg:col-span-7 space-y-2 text-xs">
                  <input type="text" placeholder="Campo de título do grupo..." className="w-full border border-gray-300 rounded-lg p-2 focus:outline-reage-blue bg-white" required />
                  
                  <select className="w-full border border-gray-300 rounded-lg p-2 focus:outline-reage-blue bg-white text-gray-600">
                    <option>Escolha a disciplina de acordo com sua grade...</option>
                    <option>Algoritmos em Grafos</option>
                    <option>Requisitos de Software</option>
                    <option>Programação Orientada a Objetos</option>
                  </select>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[9px] font-bold text-gray-500 block mb-0.5">HORÁRIO</label>
                      <input type="text" placeholder="HH : MM" className="w-full border border-gray-300 rounded-lg p-2 text-center" />
                    </div>
                    <div>
                      <label className="text-[9px] font-bold text-gray-500 block mb-0.5">LOCAL</label>
                      <input type="text" placeholder="Selecionar Local" className="w-full border border-gray-300 rounded-lg p-2 text-center" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[9px] font-bold text-gray-500 block mb-0.5">SENHA</label>
                      <input type="password" placeholder="Escolher senha (opcional)" className="w-full border border-gray-300 rounded-lg p-2 text-center" />
                    </div>
                    <div>
                      <label className="text-[9px] font-bold text-gray-500 block mb-0.5">UNIDADE</label>
                      <input type="text" placeholder="Selecionar Unidade" className="w-full border border-gray-300 rounded-lg p-2 text-center" />
                    </div>
                  </div>

                  <button type="submit" className="w-full bg-reage-dark text-white font-bold py-2.5 rounded-xl text-xs hover:bg-black transition-colors mt-2 uppercase tracking-wide">
                    ⚙️ Criar Grupo
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* CASO 3: LISTAGEM DE GRUPOS EXISTENTES + DETALHES (Captura de tela 2026-06-18 155859.jpg) */}
          {abaAtiva === 'buscar' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 animate-fade-in">
              <div className="lg:col-span-12 text-center md:text-left mb-2">
                <h3 className="text-xs font-black bg-reage-dark text-white px-4 py-1.5 rounded-md inline-block uppercase tracking-wider">
                  Grupos Existentes
                </h3>
              </div>

              {/* Listagem de Cards (Esquerda) */}
              <div className="lg:col-span-7 space-y-2 max-h-[280px] overflow-y-auto pr-1">
                <input type="text" placeholder="🔍 Buscar grupo..." className="w-full border text-xs p-2 rounded-lg bg-white mb-2" />
                
                <div className="grid grid-cols-2 gap-2">
                  {listaGrupos.map((g) => (
                    <div 
                      key={g.id}
                      onClick={() => setGrupoSelecionado(g)}
                      className={`p-3 rounded-xl border-2 text-left cursor-pointer transition-all ${grupoSelecionado?.id === g.id ? 'border-reage-blue bg-blue-50/60 shadow-sm' : 'border-gray-200 bg-white hover:bg-gray-50'}`}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-[9px] text-gray-400 font-bold">👤 04/10</span>
                        {g.senha === "Sim" && <span className="text-[9px]">🔒</span>}
                      </div>
                      <h4 className="font-bold text-[11px] text-reage-dark leading-tight line-clamp-2">{g.titulo}</h4>
                      <p className="text-[9px] text-reage-blue font-semibold mt-1">#{g.materia}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Painel Lateral de Informações do Grupo (Direita) */}
              <div className="lg:col-span-5 border border-gray-200 bg-white/90 rounded-2xl p-4 flex flex-col justify-between shadow-sm min-h-[240px]">
                {grupoSelecionado ? (
                  <div className="text-[10px] text-gray-600 space-y-2 flex flex-col h-full justify-between">
                    <div>
                      <h4 className="font-black text-center text-xs text-reage-dark uppercase pb-2 border-b mb-2">
                        Informações do Grupo
                      </h4>
                      <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[11px]">
                        <p><strong>Local:</strong> {grupoSelecionado.local}</p>
                        <p><strong>Unidade:</strong> {grupoSelecionado.unidade}</p>
                        <p><strong>Hora:</strong> {grupoSelecionado.hora}</p>
                        <p><strong>Senha:</strong> {grupoSelecionado.senha}</p>
                        <p className="col-span-2 mt-1"><strong>Matéria:</strong> {grupoSelecionado.materia}</p>
                        <p className="col-span-2"><strong>Data:</strong> {grupoSelecionado.data}</p>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => setMostrarModalSenha(true)}
                      className="w-full bg-[#38A9DC] hover:bg-sky-600 text-white font-bold py-2 rounded-xl text-xs uppercase tracking-wide mt-2"
                    >
                      + Participar
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-center h-full text-gray-400 p-4">
                    <span className="text-2xl mb-1">ℹ️</span>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-reage-dark">Informações do Grupo</p>
                    <p className="text-[10px] mt-1 leading-normal">Para visualizar as informações de um grupo, basta selecioná-lo ao lado</p>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* --- MODAL FLUTUANTE DE SENHA --- */}
      {mostrarModalSenha && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 shadow-2xl max-w-xs w-full text-center relative border border-gray-100">
            <button 
              onClick={() => setMostrarModalSenha(false)} 
              className="absolute right-4 top-4 text-gray-400 hover:text-black font-bold text-sm"
            >
              ✕
            </button>
            
            <h4 className="font-black text-reage-dark text-xs uppercase tracking-wider mb-2">Entrar no Grupo</h4>
            <p className="text-[10px] text-gray-500 font-medium mb-4">Digite a senha para entrar no grupo</p>
            
            <input 
              type="password" 
              placeholder="Senha" 
              value={senhaDigitada}
              onChange={(e) => setSenhaDigitada(e.target.value)}
              className="w-full border border-gray-300 rounded-xl p-2 text-center text-xs mb-4 focus:outline-reage-blue" 
            />
            
            <button 
              onClick={handleEntrarNoGrupo}
              className="w-full bg-reage-dark hover:bg-black text-white py-2 rounded-xl text-xs font-bold uppercase tracking-wide"
            >
              + Participar
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

// Componente das opções internas ajustado
const MenuOption = ({ icon, label }) => (
  <div className="flex flex-col items-center group cursor-pointer p-2 rounded-xl hover:bg-white/40 transition-colors">
    <div className="w-12 h-12 bg-reage-dark rounded-xl flex items-center justify-center text-white text-xl mb-1.5 group-hover:scale-105 group-hover:bg-reage-blue transition-all shadow-md">
      {icon}
    </div>
    <p className="text-[9px] font-bold text-center text-reage-dark uppercase leading-tight max-w-[90px]">
      {label}
    </p>
  </div>
);

export default Grupos;
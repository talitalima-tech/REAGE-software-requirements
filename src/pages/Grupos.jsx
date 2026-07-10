// src/pages/Grupos.jsx
import React, { useState } from 'react';

const Grupos = () => {
  // 'menu' = ícones | 'criar' = form | 'buscar' = lista | 'painel' = chat interno do grupo
  const [abaAtiva, setAbaAtiva] = useState('menu');
  const [grupoSelecionado, setGrupoSelecionado] = useState(null);
  const [mostrarModalSenha, setMostrarModalSenha] = useState(false);
  const [senhaDigitada, setSenhaDigitada] = useState('');
  
  // Estados para o Chat Interno do Grupo
  const [mostrarModalInfo, setMostrarModalInfo] = useState(false);
  const [novaMensagem, setNovaMensagem] = useState('');
  const [historicoMensagens, setHistoricoMensagens] = useState([
    { id: 1, autor: "Ariel", texto: "E aí pessoal, conseguiram fazer a questão 3 de Requisitos?", hora: "14:02" },
    { id: 2, autor: "Ana Maria", texto: "Ainda não, tô travada na elicitação de escopo daquela tabela.", hora: "14:05" },
  ]);

  const listaGrupos = [
    { id: 1, titulo: "Grupão de Requisitos de S.", materia: "Requisitos de Software", local: "Sala 02", unidade: "Unidade I", hora: "13:30", data: "25/06/2026", senha: "123" },
    { id: 2, titulo: "Vamos nos matar - POO", materia: "Programação Orientada a Objetos", local: "Laboratório 3", unidade: "Unidade I", hora: "15:30", data: "26/06/2026", senha: "Sim" },
    { id: 3, titulo: "LIP - Grupo do Ariel", materia: "Linguagens de Programação", local: "Auditorio", unidade: "Unidade I", hora: "14:00", data: "28/06/2026", senha: "Não" },
  ];

  // Executado quando o usuário valida a senha e entra no grupo
  const handleEntrarNoGrupo = () => {
    setMostrarModalSenha(false);
    setSenhaDigitada('');
    setAbaAtiva('painel'); // Direciona para a Tela do Chat/Painel
  };

  // Enviar mensagem no chat usando o estado do React
  const handleEnviarMensagem = (e) => {
    e.preventDefault();
    if (!novaMensagem.trim()) return;

    const msg = {
      id: Date.now(),
      autor: "Amanda Laiane",
      texto: novaMensagem,
      hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setHistoricoMensagens([...historicoMensagens, msg]);
    setNovaMensagem('');
  };

  return (
    <div className="bg-sky-400 min-h-[calc(100vh-160px)] flex items-center justify-center p-6 bg-cover bg-center">
      
      {/* CARD CENTRAL */}
      <div className="bg-white/80 backdrop-blur-md rounded-[40px] shadow-2xl w-full max-w-5xl flex flex-col md:flex-row overflow-hidden border border-white/20 min-h-[500px]">
        
        {/* --- LADO ESQUERDO: Perfil do Usuário (Ocultado apenas no painel do chat para dar mais espaço) --- */}
        {abaAtiva !== 'painel' && (
          <div className="w-full md:w-[35%] p-8 flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r border-gray-300/50 bg-white/40 animate-fade-in">
            {abaAtiva !== 'menu' && (
              <button 
                onClick={() => { setAbaAtiva('menu'); setGrupoSelecionado(null); }}
                className="mb-4 text-xs font-bold text-reage-blue hover:underline flex items-center gap-1 self-start"
              >
                ◀ Voltar ao Menu
              </button>
            )}

            <div className="w-24 h-24 rounded-full border-4 border-reage-blue p-1 mb-3 shadow-md">
               <div className="w-full h-full bg-blue-100 rounded-full overflow-hidden flex items-center justify-center">
                  <span className="text-3xl">🐷</span>
               </div>
            </div>

            <h2 className="text-lg font-bold text-reage-dark">Amanda Laiane</h2>
            <p className="text-xs text-gray-500 mb-6 font-medium">Engenharia de Software</p>

            <div className="grid grid-cols-2 gap-2 w-full">
              <button onClick={() => setAbaAtiva('criar')} className={`py-2.5 px-3 rounded-xl font-bold text-xs border ${abaAtiva === 'criar' ? 'bg-reage-blue text-white' : 'bg-reage-dark text-white hover:bg-black'}`}>
                <span>+</span> Criar Grupo
              </button>
              <button onClick={() => setAbaAtiva('buscar')} className={`py-2.5 px-3 rounded-xl font-bold text-xs border ${abaAtiva === 'buscar' ? 'bg-reage-blue text-white' : 'bg-white border-gray-200 text-reage-dark hover:bg-gray-50'}`}>
                <span>🔍</span> Buscar
              </button>
            </div>
            
            <button onClick={() => setAbaAtiva('menu')} className="mt-4 flex items-center gap-2 text-reage-blue font-bold border-2 border-reage-blue/30 px-6 py-2 rounded-xl hover:bg-reage-blue/10 transition-all text-xs w-full justify-center">
              <span>👥</span> Meus Grupos
            </button>
          </div>
        )}

        {/* --- LADO DIREITO: Conteúdo Dinâmico --- */}
        <div className="flex-1 p-8 flex flex-col justify-center">
          
          {/* CASO 1: MENU DE OPÇÕES PADRÃO */}
          {abaAtiva === 'menu' && (
            <div>
              <h3 className="text-sm font-black text-reage-dark mb-6 uppercase tracking-wider text-center md:text-left">O que você pode fazer aqui?</h3>
              <div className="grid grid-cols-3 gap-4">
                <div onClick={() => setAbaAtiva('criar')}><MenuOption icon="💬" label="Trocar mensagens" /></div>
                <div><MenuOption icon="🔔" label="Receber lembretes" /></div>
                <div onClick={() => setAbaAtiva('criar')}><MenuOption icon="⚙️" label="Criar seu próprio grupo" /></div>
                <div onClick={() => { setAbaAtiva('buscar'); setGrupoSelecionado(listaGrupos[0]); }}><MenuOption icon="🔖" label="Ver seus grupos salvos" /></div>
                <div onClick={() => setAbaAtiva('buscar')}><MenuOption icon="🔍" label="Buscar grupos de amigos" /></div>
                <div><MenuOption icon="⭐" label="Marcar favoritos" /></div>
              </div>
            </div>
          )}

          {/* CASO 2: FORMULÁRIO DE CRIAR GRUPO */}
          {abaAtiva === 'criar' && (
            <div className="animate-fade-in">
              <h3 className="text-xs font-black bg-reage-dark text-white px-4 py-1.5 rounded-md inline-block uppercase tracking-wider mb-6">Criar Grupo</h3>
              <form className="grid grid-cols-1 lg:grid-cols-12 gap-4" onSubmit={(e) => { e.preventDefault(); setGrupoSelecionado(listaGrupos[0]); setAbaAtiva('buscar'); }}>
                <div className="lg:col-span-5 bg-white border border-gray-200 rounded-xl p-3 text-center shadow-sm">
                  <p className="text-[10px] font-bold text-gray-500 mb-2">◀ Junho 2026 ▶</p>
                  <div className="grid grid-cols-7 gap-1 text-[9px] font-bold text-gray-400">
                    <span>D</span><span>S</span><span>T</span><span>Q</span><span>Q</span><span>S</span><span>S</span>
                    <span className="p-1">21</span><span className="p-1">22</span><span className="p-1">23</span><span className="p-1">24</span>
                    <span className="bg-reage-blue text-white rounded p-1">25</span><span className="p-1">26</span><span className="p-1">27</span>
                  </div>
                </div>
                <div className="lg:col-span-7 space-y-2 text-xs">
                  <input type="text" placeholder="Campo de título do grupo..." className="w-full border border-gray-300 rounded-lg p-2 focus:outline-reage-blue bg-white" required />
                  <select className="w-full border border-gray-300 rounded-lg p-2 focus:outline-reage-blue bg-white text-gray-600">
                    <option>Escolha a disciplina de acordo com sua grade...</option>
                    <option>Requisitos de Software</option>
                    <option>Programação Orientada a Objetos</option>
                  </select>
                  <div className="grid grid-cols-2 gap-2">
                    <input type="text" placeholder="Horário (13:30)" className="w-full border border-gray-300 rounded-lg p-2 text-center" />
                    <input type="text" placeholder="Sala 02" className="w-full border border-gray-300 rounded-lg p-2 text-center" />
                  </div>
                  <button type="submit" className="w-full bg-reage-dark text-white font-bold py-2.5 rounded-xl text-xs hover:bg-black uppercase tracking-wide">⚙️ Criar Grupo</button>
                </div>
              </form>
            </div>
          )}

          {/* CASO 3: LISTAGEM DE GRUPOS EXISTENTES */}
          {abaAtiva === 'buscar' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 animate-fade-in">
              <div className="lg:col-span-12 text-center md:text-left mb-2">
                <h3 className="text-xs font-black bg-reage-dark text-white px-4 py-1.5 rounded-md inline-block uppercase tracking-wider">Grupos Existentes</h3>
              </div>
              <div className="lg:col-span-7 space-y-2 max-h-[280px] overflow-y-auto pr-1">
                <input type="text" placeholder="🔍 Buscar grupo..." className="w-full border text-xs p-2 rounded-lg bg-white mb-2" />
                <div className="grid grid-cols-2 gap-2">
                  {listaGrupos.map((g) => (
                    <div key={g.id} onClick={() => setGrupoSelecionado(g)} className={`p-3 rounded-xl border-2 text-left cursor-pointer transition-all ${grupoSelecionado?.id === g.id ? 'border-reage-blue bg-blue-50/60' : 'border-gray-200 bg-white hover:bg-gray-50'}`}>
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-[9px] text-gray-400 font-bold">👤 03/10</span>
                        {g.senha !== "Não" && <span className="text-[9px]">🔒</span>}
                      </div>
                      <h4 className="font-bold text-[11px] text-reage-dark leading-tight line-clamp-2">{g.titulo}</h4>
                      <p className="text-[9px] text-reage-blue font-semibold mt-1">#{g.materia}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-5 border border-gray-200 bg-white/90 rounded-2xl p-4 flex flex-col justify-between shadow-sm min-h-[240px]">
                {grupoSelecionado ? (
                  <div className="text-[10px] text-gray-600 space-y-2 flex flex-col h-full justify-between">
                    <div>
                      <h4 className="font-black text-center text-xs text-reage-dark uppercase pb-2 border-b mb-2">Informações do Grupo</h4>
                      <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[11px]">
                        <p><strong>Local:</strong> {grupoSelecionado.local}</p>
                        <p><strong>Unidade:</strong> {grupoSelecionado.unidade}</p>
                        <p><strong>Hora:</strong> {grupoSelecionado.hora}</p>
                        <p><strong>Senha:</strong> {grupoSelecionado.senha}</p>
                        <p className="col-span-2 mt-1"><strong>Matéria:</strong> {grupoSelecionado.materia}</p>
                      </div>
                    </div>
                    <button onClick={() => setMostrarModalSenha(true)} className="w-full bg-[#38A9DC] hover:bg-sky-600 text-white font-bold py-2 rounded-xl text-xs uppercase tracking-wide">+ Participar</button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-center h-full text-gray-400 p-4">
                    <span className="text-2xl mb-1">ℹ️</span>
                    <p className="text-[10px] font-bold uppercase text-reage-dark">Selecione um grupo ao lado</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* CASO 4: PAINEL INTERNO DO GRUPO (CHAT ATIVO) */}
          {abaAtiva === 'painel' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 animate-fade-in w-full h-[420px]">
              {/* Topo do Chat */}
              <div className="lg:col-span-12 bg-reage-dark text-white px-4 py-2 rounded-xl flex justify-between items-center shadow-sm">
                <div>
                  <h3 className="text-xs font-black uppercase tracking-wider">{grupoSelecionado?.titulo || "Grupo de Estudos"}</h3>
                  <span className="text-[9px] opacity-80">🟢 3 estudantes online</span>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => setMostrarModalInfo(true)} className="bg-white/20 p-1.5 rounded-lg text-xs hover:bg-white/30" title="Informações">ℹ️ Info</button>
                  <button onClick={() => { setAbaAtiva('menu'); setGrupoSelecionado(null); }} className="bg-red-500/80 p-1.5 rounded-lg text-[10px] font-bold hover:bg-red-600">SAIR ✕</button>
                </div>
              </div>

              {/* Lista de Membros Online (Esquerda) */}
              <div className="lg:col-span-3 bg-white/60 border border-gray-200 rounded-xl p-3 flex flex-col gap-2 overflow-y-auto text-[10px]">
                <p className="font-bold text-gray-400 uppercase tracking-wider text-[9px] mb-1">Integrantes</p>
                <div className="flex items-center gap-1.5 bg-blue-50 p-1.5 rounded-md font-bold text-reage-blue"><span>🐷</span> Amanda (Você)</div>
                <div className="flex items-center gap-1.5 p-1.5 text-gray-600"><span>👤</span> Ariel</div>
                <div className="flex items-center gap-1.5 p-1.5 text-gray-600"><span>👤</span> Ana Maria</div>
                <div className="flex items-center gap-1.5 p-1.5 text-gray-300 italic"><span>👤</span> Vazio</div>
              </div>

              {/* Corpo das Mensagens e Input de Texto (Direita) */}
              <div className="lg:col-span-9 flex flex-col justify-between bg-white border border-gray-200 rounded-xl p-3 shadow-inner h-full overflow-hidden">
                {/* Janela de Mensagens */}
                <div className="space-y-3 overflow-y-auto pr-1 flex-1 text-[11px]">
                  {historicoMensagens.map((msg) => (
                    <div key={msg.id} className={`flex flex-col max-w-[80%] ${msg.autor === "Amanda Laiane" ? 'ml-auto items-end' : 'mr-auto items-start'}`}>
                      <span className="text-[9px] font-bold text-gray-400 mb-0.5">{msg.autor} • {msg.hora}</span>
                      <div className={`p-2.5 rounded-2xl ${msg.autor === "Amanda Laiane" ? 'bg-reage-blue text-white rounded-tr-none' : 'bg-slate-100 text-gray-800 rounded-tl-none'}`}>
                        {msg.texto}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Formulário de Enviar Mensagem */}
                <form onSubmit={handleEnviarMensagem} className="flex gap-2 border-t pt-2 mt-2">
                  <input 
                    type="text" 
                    placeholder="💬 Digite uma mensagem..." 
                    value={novaMensagem}
                    onChange={(e) => setNovaMensagem(e.target.value)}
                    className="flex-grow border border-gray-300 rounded-xl px-4 py-2 text-xs focus:outline-reage-blue bg-white"
                  />
                  <button type="submit" className="bg-reage-dark text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-black">Enviar</button>
                </form>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* --- MODAL DE DIGITAR SENHA --- */}
      {mostrarModalSenha && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 shadow-2xl max-w-xs w-full text-center relative border border-gray-100">
            <button onClick={() => setMostrarModalSenha(false)} className="absolute right-4 top-4 text-gray-400 hover:text-black font-bold text-sm">✕</button>
            <h4 className="font-black text-reage-dark text-xs uppercase tracking-wider mb-2">Entrar no Grupo</h4>
            <p className="text-[10px] text-gray-500 font-medium mb-4">Digite a senha para entrar no grupo</p>
            <input type="password" placeholder="Senha" value={senhaDigitada} onChange={(e) => setSenhaDigitada(e.target.value)} className="w-full border border-gray-300 rounded-xl p-2 text-center text-xs mb-4 focus:outline-reage-blue" />
            <button onClick={handleEntrarNoGrupo} className="w-full bg-reage-dark hover:bg-black text-white py-2 rounded-xl text-xs font-bold uppercase tracking-wide">+ Participar</button>
          </div>
        </div>
      )}

      {/* --- MODAL INTERNO: INFORMAÇÕES DO GRUPO (DENTRO DO CHAT) --- */}
      {mostrarModalInfo && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 shadow-2xl max-w-xs w-full relative text-center text-xs text-gray-700 border">
            <button onClick={() => setMostrarModalInfo(false)} className="absolute right-4 top-4 text-gray-400 font-bold">✕</button>
            <h4 className="font-black text-reage-dark text-sm uppercase border-b pb-2 mb-4">Informações</h4>
            
            <div className="space-y-2 text-left bg-slate-50 p-3 rounded-xl border mb-4 text-[11px]">
              <p><strong>Matéria:</strong> {grupoSelecionado?.materia}</p>
              <p><strong>Hora:</strong> {grupoSelecionado?.hora}</p>
              <p><strong>Local:</strong> {grupoSelecionado?.local} | {grupoSelecionado?.unidade}</p>
              <p><strong>Data:</strong> {grupoSelecionado?.data}</p>
              <p><strong>Senha:</strong> {grupoSelecionado?.senha}</p>
            </div>

            <div className="text-[10px] text-gray-400 bg-gray-100 p-2 rounded-lg break-all">
              <strong>Link:</strong> https://reage.com/grupos/{grupoSelecionado?.id}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

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
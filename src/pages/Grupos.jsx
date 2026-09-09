// src/pages/Grupos.jsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Grupos = () => {
  const location = useLocation();

  const [abaAtiva, setAbaAtiva] = useState('menu');
  const [grupoSelecionado, setGrupoSelecionado] = useState(null);
  const [mostrarModalSenha, setMostrarModalSenha] = useState(false);
  const [senhaDigitada, setSenhaDigitada] = useState('');
  const [erroSenha, setErroSenha] = useState('');

  // Estados de dados e busca
  const [termoBusca, setTermoBusca] = useState('');
  const [listaGrupos, setListaGrupos] = useState([]);
  const [carregando, setCarregando] = useState(false);

  // Estados do Formulário de Criação
  const [novoTitulo, setNovoTitulo] = useState('');
  const [novaMateria, setNovaMateria] = useState('');
  const [novoLocal, setNovoLocal] = useState('');
  const [novaUnidade, setNovaUnidade] = useState('Unidade I');
  const [novaHora, setNovaHora] = useState('');
  const [novaData, setNovaData] = useState('25/06/2026');
  const [novaSenhaGrupo, setNovaSenhaGrupo] = useState('');

  // Estados do Chat
  const [mostrarModalInfo, setMostrarModalInfo] = useState(false);
  const [novaMensagem, setNovaMensagem] = useState('');
  const [historicoMensagens, setHistoricoMensagens] = useState([]);

  // 1. BUSCAR GRUPOS DO MYSQL VIA API
  const buscarGruposDoBackend = async (busca = '') => {
    setCarregando(true);
    try {
      const url = busca
        ? `http://localhost:3001/api/grupos?busca=${encodeURIComponent(busca)}`
        : 'http://localhost:3001/api/grupos';

      const resposta = await fetch(url);
      const dados = await resposta.json();

      if (resposta.ok) {
        setListaGrupos(dados);
      }
    } catch (error) {
      console.error("Erro ao conectar com o backend:", error);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    buscarGruposDoBackend();
  }, []);

  // Monitora busca com debounce leve
  useEffect(() => {
    const timer = setTimeout(() => {
      buscarGruposDoBackend(termoBusca);
    }, 300);
    return () => clearTimeout(timer);
  }, [termoBusca]);

  // Monitora se veio da Home para abrir o chat
  useEffect(() => {
    if (location.state?.abrirDiretoNoChat && listaGrupos.length > 0) {
      setGrupoSelecionado(listaGrupos[0]);
      setAbaAtiva('painel');
      carregarMensagens(listaGrupos[0].id);
    }
  }, [location.state, listaGrupos]);

  // Carregar mensagens de um grupo específico
  const carregarMensagens = async (grupoId) => {
    try {
      const resposta = await fetch(`http://localhost:3001/api/${grupoId}/mensagens`);
      const dados = await resposta.json();
      if (resposta.ok) {
        setHistoricoMensagens(dados);
      }
    } catch (error) {
      console.error("Erro ao carregar mensagens:", error);
    }
  };

  // 2. CRIAR NOVO GRUPO NO BANCO DE DADOS
  const handleCriarGrupoSubmit = async (e) => {
    e.preventDefault();
    try {
      const resposta = await fetch('http://localhost:3001/api/grupos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          titulo: novoTitulo,
          materia: novaMateria,
          local: novoLocal,
          unidade: novaUnidade,
          hora: novaHora,
          data: novaData,
          senha: novaSenhaGrupo
        })
      });

      if (resposta.ok) {
        // Limpa formulário e atualiza lista do MySQL
        setNovoTitulo('');
        setNovaMateria('');
        setNovoLocal('');
        setNovaHora('');
        setNovaSenhaGrupo('');
        buscarGruposDoBackend();
        setAbaAtiva('buscar');
      } else {
        alert("Erro ao criar o grupo no banco.");
      }
    } catch (error) {
      console.error("Erro na requisição de criação:", error);
    }
  };

  // 3. VALIDAÇÃO REAL DE SENHA NO BACKEND
  const handleEntrarNoGrupo = async (e) => {
    e.preventDefault();
    setErroSenha('');

    if (!grupoSelecionado) return;

    if (grupoSelecionado.senha === "Não" || !grupoSelecionado.senha) {
      setMostrarModalSenha(false);
      setAbaAtiva('painel');
      carregarMensagens(grupoSelecionado.id);
      return;
    }

    try {
      const resposta = await fetch(`http://localhost:3001/api/grupos/${grupoSelecionado.id}/validar-senha`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ senha: senhaDigitada })
      });

      const dados = await resposta.json();

      if (resposta.ok && dados.sucesso) {
        setMostrarModalSenha(false);
        setSenhaDigitada('');
        setAbaAtiva('painel');
        carregarMensagens(grupoSelecionado.id);
      } else {
        setErroSenha(dados.erro || 'Senha incorreta!');
      }
    } catch (error) {
      setErroSenha('Erro ao validar senha no servidor.');
    }
  };

  // 4. ENVIAR MENSAGEM NO CHAT (Salva no MySQL)
  const handleEnviarMensagem = async (e) => {
    e.preventDefault();
    if (!novaMensagem.trim() || !grupoSelecionado) return;

    const horaAtual = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    try {
      const resposta = await fetch(`http://localhost:3001/api/${grupoSelecionado.id}/mensagens`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          autor: "Amanda Laiane",
          texto: novaMensagem,
          hora: horaAtual
        })
      });

      if (resposta.ok) {
        const mensagemSalva = await resposta.json();
        setHistoricoMensagens([...historicoMensagens, mensagemSalva]);
        setNovaMensagem('');
      }
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
    }
  };

  return (
    <div className="bg-sky-400 min-h-[calc(100vh-160px)] flex items-center justify-center p-6 bg-cover bg-center">
      
      <div className="bg-white/80 backdrop-blur-md rounded-[40px] shadow-2xl w-full max-w-5xl flex flex-col md:flex-row overflow-hidden border border-white/20 min-h-[500px]">
        
        {/* LADO ESQUERDO: Perfil */}
        {abaAtiva !== 'painel' && (
          <div className="w-full md:w-[35%] p-8 flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r border-gray-300/50 bg-white/40">
            {abaAtiva !== 'menu' && (
              <button 
                onClick={() => { setAbaAtiva('menu'); setGrupoSelecionado(null); setTermoBusca(''); }}
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
          </div>
        )}

        {/* LADO DIREITO: Conteúdo */}
        <div className="flex-1 p-8 flex flex-col justify-center">
          
          {abaAtiva === 'menu' && (
            <div>
              <h3 className="text-sm font-black text-reage-dark mb-6 uppercase tracking-wider text-center md:text-left">O que você deseja fazer?</h3>
              <div className="grid grid-cols-3 gap-4">
                <div onClick={() => setAbaAtiva('buscar')}><MenuOption icon="💬" label="Entrar em chats" /></div>
                <div><MenuOption icon="🔔" label="Receber lembretes" /></div>
                <div onClick={() => setAbaAtiva('criar')}><MenuOption icon="⚙️" label="Criar grupo no MySQL" /></div>
                <div onClick={() => setAbaAtiva('buscar')}><MenuOption icon="🔍" label="Buscar no Banco" /></div>
              </div>
            </div>
          )}

          {abaAtiva === 'criar' && (
            <div className="animate-fade-in">
              <h3 className="text-xs font-black bg-reage-dark text-white px-4 py-1.5 rounded-md inline-block uppercase tracking-wider mb-4">Novo Grupo (MySQL)</h3>
              <form className="space-y-3 text-xs" onSubmit={handleCriarGrupoSubmit}>
                <input type="text" placeholder="Título do Grupo" value={novoTitulo} onChange={(e) => setNovoTitulo(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 bg-white" required />
                <input type="text" placeholder="Matéria / Disciplina" value={novaMateria} onChange={(e) => setNovaMateria(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 bg-white" required />
                <div className="grid grid-cols-2 gap-2">
                  <input type="text" placeholder="Local (Sala 02)" value={novoLocal} onChange={(e) => setNovoLocal(e.target.value)} className="border border-gray-300 rounded-lg p-2 bg-white" required />
                  <select value={novaUnidade} onChange={(e) => setNovaUnidade(e.target.value)} className="border border-gray-300 rounded-lg p-2 bg-white">
                    <option value="Unidade I">Unidade I</option>
                    <option value="Unidade II">Unidade II</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input type="text" placeholder="Horário (13:30)" value={novaHora} onChange={(e) => setNovaHora(e.target.value)} className="border border-gray-300 rounded-lg p-2 bg-white" required />
                  <input type="text" placeholder="Senha (vazio se público)" value={novaSenhaGrupo} onChange={(e) => setNovaSenhaGrupo(e.target.value)} className="border border-gray-300 rounded-lg p-2 bg-white" />
                </div>
                <button type="submit" className="w-full bg-reage-dark text-white font-bold py-2.5 rounded-xl hover:bg-black uppercase tracking-wide">Salvar Grupo no Banco</button>
              </form>
            </div>
          )}

          {abaAtiva === 'buscar' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 animate-fade-in">
              <div className="lg:col-span-12">
                <h3 className="text-xs font-black bg-reage-dark text-white px-4 py-1.5 rounded-md inline-block uppercase tracking-wider mb-2">Grupos Cadastrados</h3>
              </div>
              <div className="lg:col-span-7 space-y-2">
                <input 
                  type="text" 
                  placeholder="🔍 Pesquisar no banco..." 
                  value={termoBusca}
                  onChange={(e) => setTermoBusca(e.target.value)}
                  className="w-full border text-xs p-2 rounded-lg bg-white mb-2" 
                />
                
                <div className="grid grid-cols-2 gap-2 max-h-[200px] overflow-y-auto">
                  {carregando ? (
                    <p className="text-xs text-gray-500">Buscando...</p>
                  ) : listaGrupos.length > 0 ? (
                    listaGrupos.map((g) => (
                      <div key={g.id} onClick={() => setGrupoSelecionado(g)} className={`p-3 rounded-xl border-2 text-left cursor-pointer transition-all ${grupoSelecionado?.id === g.id ? 'border-reage-blue bg-blue-50' : 'border-gray-200 bg-white'}`}>
                        <div className="flex justify-between items-start mb-1">
                          <span className="text-[9px] text-gray-400 font-bold">ID: {g.id}</span>
                          {g.senha !== "Não" && <span className="text-[9px]">🔒</span>}
                        </div>
                        <h4 className="font-bold text-[11px] text-reage-dark leading-tight">{g.titulo}</h4>
                        <p className="text-[9px] text-reage-blue font-semibold mt-1">#{g.materia}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-gray-400 col-span-2">Nenhum grupo encontrado.</p>
                  )}
                </div>
              </div>
              
              <div className="lg:col-span-5 border border-gray-200 bg-white/90 rounded-2xl p-4 flex flex-col justify-between shadow-sm">
                {grupoSelecionado ? (
                  <div className="text-[10px] text-gray-600 space-y-2 flex flex-col h-full justify-between">
                    <div>
                      <h4 className="font-black text-center text-xs text-reage-dark uppercase pb-2 border-b mb-2">{grupoSelecionado.titulo}</h4>
                      <p><strong>Local:</strong> {grupoSelecionado.local} ({grupoSelecionado.unidade})</p>
                      <p><strong>Hora:</strong> {grupoSelecionado.hora}</p>
                      <p><strong>Senha:</strong> {grupoSelecionado.senha !== "Não" ? "Protegido" : "Público"}</p>
                    </div>
                    <button 
                      onClick={() => {
                        if (grupoSelecionado.senha === "Não" || !grupoSelecionado.senha) {
                          setAbaAtiva('painel');
                          carregarMensagens(grupoSelecionado.id);
                        } else {
                          setMostrarModalSenha(true);
                        }
                      }} 
                      className="w-full bg-[#38A9DC] text-white font-bold py-2 rounded-xl text-xs uppercase"
                    >
                      {grupoSelecionado.senha !== "Não" ? "🔒 Entrar com Senha" : "Entrar no Chat"}
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-center text-center h-full text-gray-400">
                    <p className="text-[10px] font-bold uppercase">Selecione um grupo</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {abaAtiva === 'painel' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 animate-fade-in w-full h-[420px]">
              <div className="lg:col-span-12 bg-reage-dark text-white px-4 py-2 rounded-xl flex justify-between items-center">
                <h3 className="text-xs font-black uppercase">{grupoSelecionado?.titulo}</h3>
                <button onClick={() => { setAbaAtiva('buscar'); setGrupoSelecionado(null); }} className="bg-red-500 px-2 py-1 rounded text-[10px] font-bold">SAIR ✕</button>
              </div>

              <div className="lg:col-span-3 bg-white/60 border rounded-xl p-3 text-[10px]">
                <p className="font-bold text-gray-400 uppercase mb-1">Chat do Banco</p>
                <div className="flex items-center gap-1.5 font-bold text-reage-blue"><span>🐷</span> Amanda</div>
              </div>

              <div className="lg:col-span-9 flex flex-col justify-between bg-white border rounded-xl p-3 h-full">
                <div className="space-y-3 overflow-y-auto pr-1 flex-1 text-[11px]">
                  {historicoMensagens.map((msg) => (
                    <div key={msg.id} className={`flex flex-col max-w-[80%] ${msg.autor === "Amanda Laiane" ? 'ml-auto items-end' : 'mr-auto items-start'}`}>
                      <span className="text-[9px] font-bold text-gray-400 mb-0.5">{msg.autor} • {msg.hora}</span>
                      <div className={`p-2.5 rounded-2xl ${msg.autor === "Amanda Laiane" ? 'bg-reage-blue text-white' : 'bg-slate-100 text-gray-800'}`}>
                        {msg.texto}
                      </div>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleEnviarMensagem} className="flex gap-2 border-t pt-2 mt-2">
                  <input 
                    type="text" 
                    placeholder="💬 Mensagem..." 
                    value={novaMensagem}
                    onChange={(e) => setNovaMensagem(e.target.value)}
                    className="flex-grow border rounded-xl px-4 py-2 text-xs bg-white"
                  />
                  <button type="submit" className="bg-reage-dark text-white px-4 py-2 rounded-xl text-xs font-bold">Enviar</button>
                </form>
              </div>
            </div>
          )}

        </div>
      </div>

      {mostrarModalSenha && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <form onSubmit={handleEntrarNoGrupo} className="bg-white rounded-3xl p-6 shadow-2xl max-w-xs w-full text-center relative">
            <button type="button" onClick={() => setMostrarModalSenha(false)} className="absolute right-4 top-4 font-bold text-sm">✕</button>
            <h4 className="font-black text-xs uppercase mb-2">Senha do Grupo</h4>
            <input 
              type="password" 
              placeholder="Digite a senha" 
              value={senhaDigitada} 
              onChange={(e) => setSenhaDigitada(e.target.value)} 
              className="w-full border rounded-xl p-2 text-center text-xs mb-2"
              required 
            />
            {erroSenha && <p className="text-[10px] text-red-500 font-bold mb-2">{erroSenha}</p>}
            <button type="submit" className="w-full bg-reage-dark text-white py-2 rounded-xl text-xs font-bold uppercase">Entrar</button>
          </form>
        </div>
      )}

    </div>
  );
};

const MenuOption = ({ icon, label }) => (
  <div className="flex flex-col items-center group cursor-pointer p-2 rounded-xl hover:bg-white/40 transition-colors">
    <div className="w-12 h-12 bg-reage-dark rounded-xl flex items-center justify-center text-white text-xl mb-1.5 shadow-md">
      {icon}
    </div>
    <p className="text-[9px] font-bold text-center text-reage-dark uppercase leading-tight max-w-[90px]">
      {label}
    </p>
  </div>
);

export default Grupos;
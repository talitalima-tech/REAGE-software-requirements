// src/pages/Home.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import { SidebarCard } from '../components/SidebarCard';

const Home = () => {
  // Estado para controlar em quais grupos recomendados o usuário clicou em "Participar"
  const [gruposInscritos, setGruposInscritos] = useState({});

  const alternarParticipacao = (id) => {
    setGruposInscritos(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <main className="max-w-7xl mx-auto p-6 grid grid-cols-1 md:grid-cols-12 gap-8">
      
      <div className="md:col-span-12 bg-slate-200 p-8 rounded-2xl text-center text-gray-700 shadow-sm mb-2">
        <p className="text-sm md:text-base font-medium leading-relaxed">
          Bem-vindo(a) ao REAGE – Rede de Apoio a Grupos de Estudo! Aqui você organiza seus estudos, 
          se conecta com colegas e compartilha conhecimento de forma simples e colaborativa.
        </p>
      </div>

      <aside className="md:col-span-4 space-y-8">
        
        <SidebarCard title="Dados do Estudante">
          <div className="flex items-center gap-4 py-2">
            <Link 
              to="/login" 
              className="w-20 h-20 bg-blue-50 rounded-full border-2 border-reage-blue flex items-center justify-center overflow-hidden hover:opacity-80 transition-opacity cursor-pointer shadow-inner"
              title="Ir para o Login"
            >
              <span className="text-3xl">👤</span>
            </Link>
            <div className="text-[11px] leading-relaxed text-gray-700">
              <p><strong>Matrícula:</strong> 55XXXX</p>
              <p><strong>Curso:</strong> Engenharia de Software - MT</p>
              <p><strong>Nível:</strong> Graduação</p>
              <p><strong>Status:</strong> Ativo</p>
              <p><strong>Entrada:</strong> 2024.1</p>
            </div>
          </div>
        </SidebarCard>

        <SidebarCard title="Resumo de Participação">
          <ul className="text-xs space-y-2 py-2 text-gray-700">
            <li>• Grupos Criados: <strong>1</strong></li>
            <li>• Participação em Grupos: <strong>3</strong></li>
            <li>• Materiais Baixados: <strong>22</strong></li>
            <li className="mt-3 pt-2 border-t border-gray-100">
              <Link to="/cronograma" className="text-reage-blue hover:underline font-bold block">
                📅 Ver Meu Cronograma →
              </Link>
            </li>
          </ul>
        </SidebarCard>

        <SidebarCard title="Últimos Avisos">
          <p className="text-xs text-gray-400 text-center py-4 italic">Não há nenhum aviso disponível</p>
        </SidebarCard>
      </aside>

      <section className="md:col-span-8 space-y-10">
        
        <div>
          <h3 className="font-bold text-reage-dark mb-4 text-sm uppercase tracking-wider">
            Meus Grupos
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link to="/grupos" className="bg-reage-blue text-white p-4 rounded-xl text-center text-xs font-bold shadow-sm hover:bg-sky-600 transition-all hover:scale-[1.02]">
              Grupão de Requisitos de S.
            </Link>
            <Link to="/grupos" className="bg-reage-blue text-white p-4 rounded-xl text-center text-xs font-bold shadow-sm hover:bg-sky-600 transition-all hover:scale-[1.02]">
              Vamos nos matar - POO
            </Link>
            <Link to="/grupos" className="bg-reage-blue text-white p-4 rounded-xl text-center text-xs font-bold shadow-sm hover:bg-sky-600 transition-all hover:scale-[1.02]">
              LIP - Grupo do Ariel
            </Link>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-bold text-reage-dark text-sm uppercase tracking-wider">
            Grupos Recomendados
          </h3>
          
          <div className="bg-white border border-gray-100 rounded-xl p-4 flex justify-between items-center shadow-sm">
            <div className="text-xs">
              <p className="font-bold text-reage-blue">Aulão de Probabilidade e Estatística - Monitoria</p>
              <p className="text-gray-500">Seg: 14h | Sala 01 | Unidade I</p>
            </div>
            <button 
              onClick={() => alternarParticipacao(1)}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                gruposInscritos[1] 
                  ? 'bg-emerald-50 text-emerald-600 border-emerald-200' 
                  : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
              }`}
            >
              {gruposInscritos[1] ? '✓ Participando' : 'Participar'}
            </button>
          </div>

          <div className="bg-white border border-gray-100 rounded-xl p-4 flex justify-between items-center shadow-sm">
            <div className="text-xs">
              <p className="font-bold text-reage-blue">Aulão de Programação Orientada a Objetos - Monitoria</p>
              <p className="text-gray-500">Seg: 17h | Sala 02 | Unidade I</p>
            </div>
            <button 
              onClick={() => alternarParticipacao(2)}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                gruposInscritos[2] 
                  ? 'bg-emerald-50 text-emerald-600 border-emerald-200' 
                  : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
              }`}
            >
              {gruposInscritos[2] ? '✓ Participando' : 'Participar'}
            </button>
          </div>

          <div className="bg-white border border-gray-100 rounded-xl p-4 flex justify-between items-center shadow-sm">
            <div className="text-xs">
              <p className="font-bold text-reage-blue">Aulão de Projeto e Análise de Algoritmos - Monitoria</p>
              <p className="text-gray-500">Ter: 18h | Sala 03 | Unidade I</p>
            </div>
            <button 
              onClick={() => alternarParticipacao(3)}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                gruposInscritos[3] 
                  ? 'bg-emerald-50 text-emerald-600 border-emerald-200' 
                  : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
              }`}
            >
              {gruposInscritos[3] ? '✓ Participando' : 'Participar'}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <h3 className="bg-gray-50 p-3 font-bold border-b text-reage-dark text-xs uppercase tracking-wider text-center">
            Minhas Disciplinas
          </h3>
          <table className="w-full text-[11px]">
            <tbody className="divide-y divide-gray-100">
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="p-3 font-bold italic text-gray-800">RUS0008 - PROBABILIDADE E ESTATÍSTICA</td>
                <td className="p-3 text-right text-gray-500 font-medium">TER 08:00-10:00 / QUI 08:00-10:00</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="p-3 font-bold italic text-gray-800">RUS0300 - ALGORITMOS EM GRAFOS</td>
                <td className="p-3 text-right text-gray-500 font-medium">SEG 10:00-12:00 / QUA 10:00-12:00</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="p-3 font-bold italic text-gray-800">RUS0500 - REQUISITOS DE SOFTWARE</td>
                <td className="p-3 text-right text-gray-500 font-medium">TER 13:30-15:30 / QUI 13:30-15:30</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="p-3 font-bold italic text-gray-800">RUS0400 - REDES DE COMPUTADORES</td>
                <td className="p-3 text-right text-gray-500 font-medium">SEG 08:00-10:00 / QUA 08:00-10:00</td>
              </tr>
            </tbody>
          </table>
        </div>

      </section>
    </main>
  );
};

export default Home;
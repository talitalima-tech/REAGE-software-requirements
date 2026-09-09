// src/components/GroupCard.jsx
import React from 'react';

const GroupCard = ({ title, subject, members, time, onEnterGroup }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
      <span className="text-[10px] font-bold uppercase tracking-wider text-reage-blue bg-reage-blue/10 px-2 py-1 rounded">
        {subject}
      </span>

      <h3 className="mt-3 text-lg font-bold text-reage-dark group-hover:text-reage-blue transition-colors">
        {title}
      </h3>

      <div className="mt-4 flex flex-col gap-2 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <span className="font-medium text-reage-dark">Horário:</span> {time}
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium text-reage-dark">Membros:</span> {members} alunos
        </div>
      </div>

      <button 
        onClick={onEnterGroup}
        className="w-full mt-5 bg-reage-yellow hover:bg-yellow-400 text-reage-dark font-bold py-2 rounded-lg text-sm transition-colors"
      >
        Entrar no Grupo
      </button>
    </div>
  );
};

export default GroupCard;
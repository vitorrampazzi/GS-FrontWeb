"use client"; 

import React, { useState } from 'react';

export default function ProfileActions({ profileName }) {
  const [isRecommended, setIsRecommended] = useState(false);

  const handleRecommend = () => {
    const newState = !isRecommended;
    setIsRecommended(newState);
    
    if (newState) {
      alert(`Sucesso! Você recomendou o profissional ${profileName}.`);
    } else {
      alert(`Recomendação removida para ${profileName}.`);
    }
  };

  const handleMessage = () => {
    alert(`Iniciando chat com ${profileName}...\n(Funcionalidade de mensagem simulada)`);
  };

  return (
    <div className="flex flex-wrap gap-4 justify-center mt-6">
      <button
        onClick={handleRecommend}
        className={`
          px-6 py-2 rounded-full font-bold transition-all shadow-md border-2
          ${isRecommended 
            ? 'bg-green-100 border-green-500 text-green-700 hover:bg-green-200' 
            : 'bg-white border-blue-500 text-blue-500 hover:bg-blue-50'}
        `}
      >
        {isRecommended ? '★ Recomendado' : '☆ Recomendar Profissional'}
      </button>

      <button
        onClick={handleMessage}
        className="px-6 py-2 rounded-full font-bold bg-blue-600 text-white shadow-md hover:bg-blue-700 transition-colors"
      >
        ✉ Enviar Mensagem
      </button>
    </div>
  );
}
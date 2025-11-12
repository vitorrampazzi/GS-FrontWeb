import React from 'react';
import Image from 'next/image';

function Modal({ profile, onClose }) {
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >

      <div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6"
        onClick={(e) => e.stopPropagation()} 
      >
        <button onClick={onClose} className="float-right font-bold text-2xl -mt-2">&times;</button>
        
        <div className="text-center">
          <Image 
            src={profile.avatar} 
            alt={profile.name} 
            className="w-32 h-32 rounded-full mx-auto mb-4" 
            width={128} 
            height={128} 
          />
          <h2 className="text-3xl font-bold">{profile.name}</h2>
          <p className="text-xl text-blue-500 dark:text-blue-400">{profile.title}</p>
          <p className="mt-2 text-gray-600 dark:text-gray-400">{profile.city} - {profile.area}</p>
        </div>

        <div className="mt-6 space-y-4">
          <div>
            <h3 className="text-xl font-semibold border-b border-gray-300 dark:border-gray-700 pb-2">Sobre</h3>
            <p className="mt-2 text-gray-700 dark:text-gray-300">{profile.bio}</p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold border-b border-gray-300 dark:border-gray-700 pb-2">Formação</h3>
            <p className="mt-2 text-gray-700 dark:text-gray-300">{profile.education}</p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold border-b border-gray-300 dark:border-gray-700 pb-2">Experiência</h3>
            <p className="mt-2 text-gray-700 dark:text-gray-300">{profile.experience}</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold border-b border-gray-300 dark:border-gray-700 pb-2">Hard Skills</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {profile.skills.map(skill => (
                <span key={skill} className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full px-3 py-1 text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold border-b border-gray-300 dark:border-gray-700 pb-2">Soft Skills</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {profile.softSkills.map(skill => (
                <span key={skill} className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full px-3 py-1 text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-4 mt-8">
          <button 
            className="flex-1 bg-blue-600 text-white p-3 rounded-lg font-bold hover:bg-blue-700 transition-colors"
            onClick={() => alert(`Recomendação enviada para ${profile.name}!`)}
          >
            Recomendar Profissional
          </button>
          <button 
            className="flex-1 bg-gray-600 text-white p-3 rounded-lg font-bold hover:bg-gray-700 transition-colors"
            onClick={() => alert(`Mensagem enviada para ${profile.name}!`)}
          >
            Enviar Mensagem
          </button>
        </div>

      </div>
    </div>
  );
}

export default Modal;
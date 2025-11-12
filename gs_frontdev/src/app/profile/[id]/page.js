import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Função para buscar o perfil da API Python
async function getProfile(id) {
    try {
        const res = await fetch(`http://127.0.0.1:5000/api/profile/${id}`);
        if (!res.ok) { return null; }
        return res.json();
    } catch (error) {
        console.error("ERRO AO BUSCAR DO PYTHON:", error);
        return null;
    }
}

// A Página de Perfil (renderizada no servidor)
export default async function ProfilePage({ params }) {
  
  // 1. Resolve a promessa 'params'
  const unwrappedParams = await params; 
  
  // 2. Busca o perfil da API
  const profile = await getProfile(unwrappedParams.id); 

  // 3. Se não encontrar o perfil
  if (!profile) {
    return (
      <div className="text-center p-10">
        <h1 className="text-3xl font-bold">Perfil não encontrado</h1>
        <p className="text-gray-400">ID: {unwrappedParams.id}</p>
        <Link href="/" className="text-blue-500 hover:underline mt-4 inline-block">
          Voltar para a home
        </Link>
      </div>
    );
  }

  // 4. Se encontrar, renderiza o perfil com a nova estrutura de dados
  return (
    <main className="max-w-4xl mx-auto p-6 md:p-10">
      <Link href="/" className="text-blue-500 hover:underline mb-6 inline-block">
        &larr; Voltar para a lista
      </Link>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
        {/* --- CABEÇALHO DO PERFIL --- */}
        <div className="p-6 md:p-8 text-center bg-gray-50 dark:bg-gray-900">
          <Image 
            src={profile.foto} 
            alt={profile.nome} 
            className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-blue-500" 
            width={128}
            height={128}
          />
          <h2 className="text-3xl font-bold">{profile.nome}</h2>
          <p className="text-xl text-blue-500 dark:text-blue-400">{profile.cargo}</p>
          <p className="mt-2 text-gray-600 dark:text-gray-400">{profile.localizacao} - {profile.area}</p>
        </div>
        
        <div className="p-6 md:p-8 space-y-6">
          {/* --- RESUMO --- */}
          <div>
            <h3 className="text-2xl font-semibold border-b border-gray-300 dark:border-gray-700 pb-2">Resumo</h3>
            <p className="mt-3 text-gray-700 dark:text-gray-300">{profile.resumo}</p>
          </div>

          {/* --- EXPERIÊNCIAS --- */}
          <div>
            <h3 className="text-2xl font-semibold border-b border-gray-300 dark:border-gray-700 pb-2">Experiência</h3>
            <div className="mt-3 space-y-4">
              {profile.experiencias.map((exp, index) => (
                <div key={index} className="pl-4 border-l-4 border-gray-200 dark:border-gray-700">
                  <h4 className="font-bold text-lg">{exp.cargo}</h4>
                  <p className="text-blue-500 dark:text-blue-400">{exp.empresa}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{exp.inicio} – {exp.fim}</p>
                  <p className="mt-1 text-gray-700 dark:text-gray-300">{exp.descricao}</p>
                </div>
              ))}
            </div>
          </div>

          {/* --- FORMAÇÃO --- */}
          <div>
            <h3 className="text-2xl font-semibold border-b border-gray-300 dark:border-gray-700 pb-2">Formação</h3>
            <div className="mt-3 space-y-3">
              {profile.formacao.map((form, index) => (
                <div key={index}>
                  <h4 className="font-bold text-lg">{form.curso}</h4>
                  <p className="text-blue-500 dark:text-blue-400">{form.instituicao} (Ano: {form.ano})</p>
                </div>
              ))}
            </div>
          </div>

          {/* --- HABILIDADES TÉCNICAS --- */}
          <div>
            <h3 className="text-2xl font-semibold border-b border-gray-300 dark:border-gray-700 pb-2">Habilidades Técnicas</h3>
            <div className="flex flex-wrap gap-2 mt-3">
              {profile.habilidadesTecnicas.map(skill => (
                <span key={skill} className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full px-3 py-1 text-sm font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* --- SOFT SKILLS --- */}
          <div>
            <h3 className="text-2xl font-semibold border-b border-gray-300 dark:border-gray-700 pb-2">Soft Skills</h3>
            <div className="flex flex-wrap gap-2 mt-3">
              {profile.softSkills.map(skill => (
                <span key={skill} className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full px-3 py-1 text-sm font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* --- PROJETOS --- */}
          {profile.projetos.length > 0 && (
            <div>
              <h3 className="text-2xl font-semibold border-b border-gray-300 dark:border-gray-700 pb-2">Projetos</h3>
              <div className="mt-3 space-y-3">
                {profile.projetos.map((proj, index) => (
                  <div key={index}>
                    <a href={proj.link} target="_blank" rel="noopener noreferrer" className="font-bold text-lg text-blue-500 hover:underline">{proj.titulo}</a>
                    <p className="mt-1 text-gray-700 dark:text-gray-300">{proj.descricao}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* --- IDIOMAS E CERTIFICAÇÕES --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-2xl font-semibold border-b border-gray-300 dark:border-gray-700 pb-2">Idiomas</h3>
              <ul className="mt-3 list-disc list-inside space-y-1">
                {profile.idiomas.map((lang, index) => (
                  <li key={index}>{lang.idioma} - {lang.nivel}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-semibold border-b border-gray-300 dark:border-gray-700 pb-2">Certificações</h3>
              <ul className="mt-3 list-disc list-inside space-y-1">
                {profile.certificacoes.map((cert, index) => (
                  <li key={index}>{cert}</li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
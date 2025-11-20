import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
// 1. Importamos o componente dos botões interativos (Cliente)
import ProfileActions from '@/components/ProfileActions';

// Função para buscar o perfil da API Python
async function getProfile(id) {
  try {
    // Busca os dados do backend Flask
    const res = await fetch(`http://127.0.0.1:5000/api/profile/${id}`, {
      cache: 'no-store' // Garante dados frescos a cada requisição
    });
    
    if (!res.ok) { return null; }
    return res.json();
  } catch (error) {
    console.error("ERRO AO BUSCAR DO PYTHON:", error);
    return null;
  }
}

export default async function ProfilePage({ params }) {
  // 1. Resolve a promessa 'params' (necessário no Next.js mais recente)
  const unwrappedParams = await params; 
  
  // 2. Busca o perfil da API
  const profile = await getProfile(unwrappedParams.id); 

  // 3. Se não encontrar o perfil, mostra mensagem de erro
  if (!profile) {
    return (
      <div className="text-center p-10">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Perfil não encontrado</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">Não foi possível localizar o ID: {unwrappedParams.id}</p>
        <Link href="/" className="text-blue-500 hover:underline mt-4 inline-block">
          Voltar para a home
        </Link>
      </div>
    );
  }

  // 4. Renderiza o perfil
  return (
    <main className="max-w-4xl mx-auto p-6 md:p-10">
      <Link href="/" className="text-blue-500 dark:text-blue-400 hover:underline mb-6 inline-block font-medium">
        &larr; Voltar para a lista
      </Link>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700 transition-colors duration-300">
        
        {/* --- CABEÇALHO DO PERFIL --- */}
        <div className="p-8 text-center from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 border-b border-gray-100 dark:border-gray-700">
          <div className="relative w-32 h-32 mx-auto mb-4">
            <Image 
              src={profile.foto} 
              alt={profile.nome} 
              className="rounded-full border-4 border-white dark:border-gray-700 shadow-md object-cover" 
              fill
              sizes="128px"
              priority
            />
          </div>
          
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{profile.nome}</h2>
          <p className="text-xl text-blue-600 dark:text-blue-400 font-medium mt-1">{profile.cargo}</p>
          <p className="mt-2 text-gray-500 dark:text-gray-400 flex items-center justify-center gap-2">
            <span>📍 {profile.localizacao}</span>
            <span>•</span>
            <span>{profile.area}</span>
          </p>
          
          {/* 5. AQUI ESTÃO OS BOTÕES! */}
          <ProfileActions profileName={profile.nome} />

        </div>
        
        {/* --- CORPO DO PERFIL (Informações Detalhadas) --- */}
        <div className="p-8 space-y-8">
          
          {/* Resumo */}
          <section>
            <h3 className="text-2xl font-semibold border-b border-gray-200 dark:border-gray-700 pb-3 text-gray-800 dark:text-gray-100 mb-4">Resumo Profissional</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">{profile.resumo}</p>
          </section>

          {/* Experiências */}
          <section>
            <h3 className="text-2xl font-semibold border-b border-gray-200 dark:border-gray-700 pb-3 text-gray-800 dark:text-gray-100 mb-4">Experiência</h3>
            <div className="space-y-6">
              {profile.experiencias.map((exp, index) => (
                <div key={index} className="pl-4 border-l-4 border-blue-100 dark:border-blue-900 hover:border-blue-500 dark:hover:border-blue-400 transition-colors duration-300">
                  <div className="flex justify-between items-start flex-wrap">
                    <h4 className="font-bold text-xl text-gray-900 dark:text-white">{exp.cargo}</h4>
                    <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">{exp.inicio} – {exp.fim}</span>
                  </div>
                  <p className="text-blue-600 dark:text-blue-400 font-medium text-lg">{exp.empresa}</p>
                  <p className="mt-2 text-gray-700 dark:text-gray-300">{exp.descricao}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Formação */}
          <section>
            <h3 className="text-2xl font-semibold border-b border-gray-200 dark:border-gray-700 pb-3 text-gray-800 dark:text-gray-100 mb-4">Formação Acadêmica</h3>
            <div className="space-y-4">
              {profile.formacao.map((form, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                  <h4 className="font-bold text-lg text-gray-900 dark:text-white">{form.curso}</h4>
                  <p className="text-blue-600 dark:text-blue-400">{form.instituicao}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Conclusão: {form.ano}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Skills (Grid de 2 colunas) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Técnicas */}
            <section>
              <h3 className="text-2xl font-semibold border-b border-gray-200 dark:border-gray-700 pb-3 text-gray-800 dark:text-gray-100 mb-4">Habilidades Técnicas</h3>
              <div className="flex flex-wrap gap-2">
                {profile.habilidadesTecnicas.map(skill => (
                  <span key={skill} className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-800 rounded-full px-4 py-1.5 text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            {/* Soft Skills */}
            <section>
              <h3 className="text-2xl font-semibold border-b border-gray-200 dark:border-gray-700 pb-3 text-gray-800 dark:text-gray-100 mb-4">Soft Skills</h3>
              <div className="flex flex-wrap gap-2">
                {profile.softSkills.map(skill => (
                  <span key={skill} className="bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 border border-green-100 dark:border-green-800 rounded-full px-4 py-1.5 text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          </div>

          {/* Projetos */}
          {profile.projetos && profile.projetos.length > 0 && (
            <section>
              <h3 className="text-2xl font-semibold border-b border-gray-200 dark:border-gray-700 pb-3 text-gray-800 dark:text-gray-100 mb-4">Projetos em Destaque</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {profile.projetos.map((proj, index) => (
                  <div key={index} className="border border-gray-200 dark:border-gray-700 p-5 rounded-lg hover:shadow-md transition-shadow bg-white dark:bg-gray-800">
                    <a href={proj.link} target="_blank" rel="noopener noreferrer" className="font-bold text-lg text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-2">
                      {proj.titulo} 
                      <span className="text-xs">↗</span>
                    </a>
                    <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm">{proj.descricao}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Idiomas e Certificações */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-gray-50 dark:bg-gray-700/30 p-6 rounded-xl">
            <section>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                🌐 Idiomas
              </h3>
              <ul className="space-y-2">
                {profile.idiomas.map((lang, index) => (
                  <li key={index} className="flex justify-between items-center bg-white dark:bg-gray-800 p-2 rounded border border-gray-100 dark:border-gray-600">
                    <span className="font-medium text-gray-800 dark:text-gray-200">{lang.idioma}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{lang.nivel}</span>
                  </li>
                ))}
              </ul>
            </section>
            
            <section>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                📜 Certificações
              </h3>
              <ul className="space-y-2">
                {profile.certificacoes.map((cert, index) => (
                  <li key={index} className="bg-white dark:bg-gray-800 p-2 rounded border border-gray-100 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm">
                    {cert}
                  </li>
                ))}
              </ul>
            </section>
          </div>

        </div>
      </div>
    </main>
  );
}
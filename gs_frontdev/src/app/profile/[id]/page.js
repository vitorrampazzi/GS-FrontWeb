import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import profilesData from '@/data/profiles.json';

function getProfile(id) {
  return profilesData.find(p => p.id.toString() === id);
}

// 1. A função é async
export default async function ProfilePage({ params }) {
  
  // 2. NÓS PRECISAMOS ESPERAR (await) a promessa 'params' ser resolvida!
  //    Esta é a linha que faltava.
  const unwrappedParams = await params; 

  // 3. AGORA sim podemos usar o '.id'
  const profile = getProfile(unwrappedParams.id); 

  // Se o perfil não for encontrado
  if (!profile) {
    return (
      <div className="text-center p-10">
        <h1 className="text-3xl font-bold">Perfil não encontrado</h1>
        <Link href="/" className="text-blue-500 hover:underline mt-4 inline-block">
          Voltar para a home
        </Link>
      </div>
    );
  }

  // Se o perfil for encontrado, mostramos os detalhes
  return (
    <main className="max-w-2xl mx-auto p-6 md:p-10">
      <Link href="/" className="text-blue-500 hover:underline mb-6 inline-block">
        &larr; Voltar para a lista
      </Link>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6">
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

        {/* O resto do código (sobre, formação, etc.) */}
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
      </div>
    </main>
  );
}
// src/app/page.jsx

import ProfileList from '@/components/ProfileList';
// import profilesData from '@/data/profiles.json'; // <-- DELETE ESTA LINHA

// Esta função vai rodar no SERVIDOR do Next.js
async function getProfilesFromServer() {
    // Busca os dados do seu backend Python!
    // Garanta que seu 'python app.py' está rodando
    try {
        const res = await fetch('http://127.0.0.1:5000/api/profiles');
        if (!res.ok) {
            throw new Error('Falha ao buscar dados do backend');
        }
        return res.json();
    } catch (error) {
        console.error(error);
        return []; // Retorna um array vazio em caso de erro
    }
}

export default async function HomePage() {
  // 1. Espera os dados chegarem do backend
  const profilesData = await getProfilesFromServer();

  return (
    <main className="p-8 max-w-7xl mx-auto">
      {/* 2. Passa os dados para o componente de cliente */}
      <ProfileList allProfiles={profilesData} />
    </main>
  );
}
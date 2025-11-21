import React from 'react';
import ProfileList from '@/components/ProfileList';

async function getProfilesFromServer() {
    try {
      
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000';
        const res = await fetch(`${baseUrl}/api/profiles`);

        if (!res.ok) {
            throw new Error('Falha ao buscar dados do backend');
        }
        return res.json();
    } catch (error) {
        console.error(error);
        return []; 
    }
}

export default async function HomePage() {
  const profilesData = await getProfilesFromServer();

  return (
    <main className="p-8 max-w-7xl mx-auto">
      <ProfileList allProfiles={profilesData} />
    </main>
  );
}
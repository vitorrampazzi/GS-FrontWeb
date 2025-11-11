"use client"; 

import React, { useState, useEffect, useMemo } from 'react';
import ProfileCard from './ProfileCard';
import Modal from './Modal';

export default function ProfileList({ allProfiles }) {


  const [profiles, setProfiles] = useState(allProfiles); 
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [areaFilter, setAreaFilter] = useState('');
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const filteredProfiles = useMemo(() => {
    return profiles.filter(profile => {
      const nameMatch = profile.name.toLowerCase().includes(searchTerm.toLowerCase());
      const skillMatch = profile.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
      const areaMatch = areaFilter === '' || profile.area === areaFilter;
      return (nameMatch || skillMatch) && areaMatch;
    });
  }, [profiles, searchTerm, areaFilter]);

  const toggleDarkMode = () => setIsDark(!isDark);

  return (
    <>

      <header className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-400">
            DevConnect (Next.js)
          </h1>
          <button onClick={toggleDarkMode} className="p-2 rounded-full bg-gray-200 dark:bg-gray-700">
            {isDark ? '☀️' : '🌙'}
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <input 
            type="text"
            placeholder="Buscar por nome ou skill..."
            className="flex-1 p-3 rounded-lg border bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="p-3 rounded-lg border bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700"
            value={areaFilter}
            onChange={(e) => setAreaFilter(e.target.value)}
          >
            <option value="">Todas as Áreas</option>
            <option value="Tecnologia">Tecnologia</option>
            <option value="Design">Design</option>
          </select>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProfiles.length > 0 ? (
          filteredProfiles.map(profile => (
            <ProfileCard 
              key={profile.id} 
              profile={profile}
              onSelect={setSelectedProfile} 
            />
          ))
        ) : (
          <p className="col-span-full text-center text-xl">Nenhum perfil encontrado.</p>
        )}
      </div>

      {selectedProfile && (
        <Modal 
          profile={selectedProfile}
          onClose={() => setSelectedProfile(null)}
        />
      )}
    </>
  );
}
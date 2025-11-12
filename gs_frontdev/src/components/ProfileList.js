"use client"; 

import React, { useState, useEffect, useMemo } from 'react';
import ProfileCard from './ProfileCard';
import Modal from './Modal';

export default function ProfileList({ allProfiles }) {
  

  const [profiles, setProfiles] = useState(allProfiles); 
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [areaFilter, setAreaFilter] = useState('');
  const [cityFilter, setCityFilter] = useState(''); 
  const [isDark, setIsDark] = useState(false);


  const uniqueAreas = useMemo(() => {
    const allAreas = allProfiles.map(profile => profile.area);
    return [...new Set(allAreas)].sort(); 
  }, [allProfiles]);

  const uniqueCities = useMemo(() => {
    const allCities = allProfiles.map(profile => profile.city);
    return [...new Set(allCities)].sort();
  }, [allProfiles]);



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
      const cityMatch = cityFilter === '' || profile.city === cityFilter;
      
      return (nameMatch || skillMatch) && areaMatch && cityMatch;
    });
  }, [profiles, searchTerm, areaFilter, cityFilter]); 

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

            {uniqueAreas.map(area => (
              <option key={area} value={area}>{area}</option>
            ))}
          </select>

          <select
            className="p-3 rounded-lg border bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700"
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
          >
            <option value="">Todas as Cidades</option>
            {uniqueCities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
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
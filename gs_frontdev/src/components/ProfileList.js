"use client"; 

import React, { useState, useEffect, useMemo } from 'react';
import ProfileCard from './ProfileCard';

const getColor = () => {
    if (typeof window !== 'undefined') {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            return true;
        }
        if (savedTheme === 'light') {
            return false;
        }
    }
    return false;
};
export default function ProfileList({ allProfiles }) {
  
  const [profiles, setProfiles] = useState(allProfiles); 
  const [searchTerm, setSearchTerm] = useState('');
  const [areaFilter, setAreaFilter] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [isDark, setIsDark] = useState(getColor);
  
  
  const uniqueAreas = useMemo(() => {
    const allAreas = allProfiles.map(profile => profile.area);
    return [...new Set(allAreas)].sort(); 
  }, [allProfiles]);

  const uniqueCities = useMemo(() => {
    const allCities = allProfiles.map(profile => profile.localizacao);
    return [...new Set(allCities)].sort();
  }, [allProfiles]);
  
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]); 

  const filteredAndSortedProfiles = useMemo(() => {
    
    const filtered = profiles.filter(profile => {
      const nameMatch = profile.nome.toLowerCase().includes(searchTerm.toLowerCase());
      
      const skillMatch = profile.habilidadesTecnicas.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const areaMatch = areaFilter === '' || profile.area === areaFilter;
      
      const cityMatch = cityFilter === '' || profile.localizacao === cityFilter;
      
      return (nameMatch || skillMatch) && areaMatch && cityMatch;
    });

    const sorted = [...filtered].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.nome.localeCompare(b.nome); 
      } else {
        return b.nome.localeCompare(a.nome);
      }
    });
    
    return sorted;
  }, [profiles, searchTerm, areaFilter, cityFilter, sortOrder]);

  return (
    <>
      <header className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-400">
            DevConnect
          </h1>
          
          <button 
            onClick={() => setIsDark(!isDark)} 
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700">
            {isDark ? '☀️' : '🌙'}
          </button>

        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <input 
            type="text"
            placeholder="Buscar por nome ou habilidade..."
            className="p-3 rounded-lg border bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 md:col-span-2 lg:col-span-1"
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
            <option value="">Todas as Localizações</option>
            {uniqueCities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
          <button
            className="p-3 rounded-lg border bg-blue-500 text-white font-bold hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800"
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          >
            Ordenar: {sortOrder === 'asc' ? 'A-Z' : 'Z-A'}
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredAndSortedProfiles.map(profile => (
          <ProfileCard 
            key={profile.id} 
            profile={profile}
          />
        ))}
      </div>
    </>
  );
}
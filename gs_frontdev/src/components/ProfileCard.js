import React from 'react';
import Image from 'next/image';

function ProfileCard({ profile, onSelect }) {
  return (
    <div 
      className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md cursor-pointer hover:scale-105 transition-transform"
      onClick={() => onSelect(profile)}
    >
      

      <Image 
        src={profile.avatar} 
        alt={profile.name} 
        className="w-24 h-24 rounded-full mx-auto"
        width={96}
        height={96}
      />
      
      <h3 className="text-xl font-bold text-center mt-4">{profile.name}</h3>
      <p className="text-center text-blue-500 dark:text-blue-400">{profile.title}</p>
      
      <div className="flex flex-wrap gap-2 justify-center mt-4">
        {profile.skills.slice(0, 3).map((skill) => (
          <span key={skill} className="bg-blue-200 dark:bg-blue-700 text-sm rounded-full px-3 py-1">
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

export default ProfileCard;
import ProfileList from '@/components/ProfileList';
import profilesData from '@/data/profiles.json'; 

export default function HomePage() {
  return (
    <main className="p-8 max-w-7xl mx-auto"> 
      <ProfileList allProfiles={profilesData} />
    </main>
  );
}
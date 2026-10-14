import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ActivitiesSection } from './components/ActivitiesSection';
import { TimelineUpdates } from './components/TimelineUpdates';
import { MembersDirectory } from './components/MembersDirectory';
import { EmergencyBlood } from './components/EmergencyBlood';
import { VideoGallery } from './components/VideoGallery';
import { DonationSection } from './components/DonationSection';
import { Footer } from './components/Footer';

// Modals
import { VideoPlayerModal } from './components/VideoPlayerModal';
import { AddUpdateModal } from './components/AddUpdateModal';
import { AddMemberModal } from './components/AddMemberModal';
import { MemberIdModal } from './components/MemberIdModal';
import { ActivityDetailModal } from './components/ActivityDetailModal';

// Initial Datasets
import { membersData } from './data/membersData';
import { initialActivitiesData } from './data/activitiesData';

export function App() {
  // Members State with LocalStorage Persistence
  const [members, setMembers] = useState(() => {
    try {
      const saved = localStorage.getItem('ybs_members_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error("Failed to load saved members:", e);
    }
    return membersData;
  });

  // Activities State with LocalStorage Persistence
  const [activities, setActivities] = useState(() => {
    try {
      const saved = localStorage.getItem('ybs_activities_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error("Failed to load saved activities:", e);
    }
    return initialActivitiesData;
  });

  // Modal States
  const [activeVideo, setActiveVideo] = useState(null); // { id, title }
  const [selectedMember, setSelectedMember] = useState(null);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [isAddUpdateOpen, setIsAddUpdateOpen] = useState(false);
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);

  // Sync to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('ybs_members_v1', JSON.stringify(members));
    } catch (e) {
      console.error(e);
    }
  }, [members]);

  useEffect(() => {
    try {
      localStorage.setItem('ybs_activities_v1', JSON.stringify(activities));
    } catch (e) {
      console.error(e);
    }
  }, [activities]);

  // Handlers
  const handleAddActivity = (newActivity) => {
    setActivities((prev) => [newActivity, ...prev]);
  };

  const handleAddMember = (newMember) => {
    setMembers((prev) => [newMember, ...prev]);
  };

  const handleWatchVideo = (videoId, title) => {
    setActiveVideo({ id: videoId, title: title || "কার্যক্রম ভিডিও ডকুমেন্টারি" });
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1E293B] flex flex-col font-['Hind_Siliguri','Plus_Jakarta_Sans',sans-serif]">
      
      {/* Official Navigation Bar */}
      <Navbar
        onOpenMemberModal={() => setIsAddMemberOpen(true)}
        onOpenDonateModal={() => {
          const el = document.getElementById('donate');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenMemberModal={() => setIsAddMemberOpen(true)}
          onOpenAddUpdateModal={() => setIsAddUpdateOpen(true)}
        />

        {/* About Section */}
        <AboutSection />

        {/* Activities Section (Photos, Description, Filter, YouTube triggers) */}
        <ActivitiesSection
          activities={activities}
          onWatchVideo={handleWatchVideo}
          onOpenAddModal={() => setIsAddUpdateOpen(true)}
          onSelectActivity={(act) => setSelectedActivity(act)}
        />

        {/* Interactive Chronological Timeline (2019 to 2026+ and Upcoming) */}
        <TimelineUpdates
          activities={activities}
          onWatchVideo={handleWatchVideo}
          onOpenAddModal={() => setIsAddUpdateOpen(true)}
          onSelectActivity={(act) => setSelectedActivity(act)}
        />

        {/* 100 Members Directory with Search, Blood Filters, CSV Export, ID Modal */}
        <MembersDirectory
          members={members}
          onSelectMember={(m) => setSelectedMember(m)}
          onOpenAddMemberModal={() => setIsAddMemberOpen(true)}
        />

        {/* 24/7 Emergency Blood Donor Finder matching the 100 members */}
        <EmergencyBlood members={members} />

        {/* YouTube Video Documentation Archive */}
        <VideoGallery
          activities={activities}
          onWatchVideo={handleWatchVideo}
          onAddCustomVideo={handleAddActivity}
        />

        {/* Transparent Donation Section (bKash, Nagad, Bank info) */}
        <DonationSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      {activeVideo && (
        <VideoPlayerModal
          videoId={activeVideo.id}
          videoTitle={activeVideo.title}
          onClose={() => setActiveVideo(null)}
        />
      )}

      {selectedMember && (
        <MemberIdModal
          member={selectedMember}
          onClose={() => setSelectedMember(null)}
        />
      )}

      {selectedActivity && (
        <ActivityDetailModal
          activity={selectedActivity}
          onClose={() => setSelectedActivity(null)}
          onWatchVideo={handleWatchVideo}
        />
      )}

      <AddUpdateModal
        isOpen={isAddUpdateOpen}
        onClose={() => setIsAddUpdateOpen(false)}
        onAddActivity={handleAddActivity}
      />

      <AddMemberModal
        isOpen={isAddMemberOpen}
        onClose={() => setIsAddMemberOpen(false)}
        onAddMember={handleAddMember}
      />

    </div>
  );
}

export default App;

import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './Components/Navbar';
import LandingPage from './Components/LandingPage';
import Onboarding from './Components/Onboarding';
import DashboardPage from './Components/DashboardPage';
import MoodTrackerPage from './Components/MoodTrackerPage';
import JournalPage from './Components/JournalPage';
import AIChatPage from './Components/AIChatPage';
import AssessmentPage from './Components/AssessmentPage';
import ResourcesPage from './Components/ResourcesPage';
import Settings from './Components/Settings';
import AuthPage from './Components/AuthPage'; 
function App() {
  const [openSettings, setOpenSettings] = useState(false);

  // Temporary authentication state — will be replaced with Firebase auth state
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-800 dark:text-gray-100">
      {/* NAVBAR */}
      <Navbar
        onSettingsOpen={() => setOpenSettings(true)}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />

      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/mood" element={<MoodTrackerPage />} />
          <Route path="/journal" element={<JournalPage />} />
          <Route path="/chat" element={<AIChatPage />} />
          <Route path="/assessments" element={<AssessmentPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route
            path="/auth"
            element={<AuthPage setIsLoggedIn={setIsLoggedIn} />}
          />
        </Routes>
      </main>

      {/* GLOBAL SETTINGS POPUP */}
      <Settings isOpen={openSettings} onClose={() => setOpenSettings(false)} />
    </div>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navigation } from './components/Navigation';

// Auth pages
import { Login } from './pages/auth/Login';
import { Signup } from './pages/auth/Signup';

// Main app pages
import { Dashboard } from './pages/dashboard/Dashboard';
import { HealthTracking } from './pages/health/HealthTracking';
import { Emergency } from './pages/emergency/Emergency';
import { Messages } from './pages/messages/Messages';
import { Profile } from './pages/profile/Profile';

import './styles/globals.css';

function App() {
  const isAuthenticated = true; // This would come from auth context in a real app

  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* App Routes */}
        {isAuthenticated ? (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/health" element={<HealthTracking />} />
            <Route path="/emergency" element={<Emergency />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/profile" element={<Profile />} />

            {/* Default redirect */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </>
        ) : (
          <Route path="/" element={<Navigate to="/login" replace />} />
        )}
      </Routes>

      {/* Navigation - Only show on app routes */}
      {isAuthenticated && <Navigation />}
    </Router>
  );
}

export default App;

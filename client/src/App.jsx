import React, { useEffect } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { Toaster } from "sonner";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthPage from "./pages/Auth";
import AdminDashboard from "./pages/Admin";
import Home from "./pages/Home";
import Leaderboard from "./pages/Leaderboard";
import AOS from 'aos';
import 'aos/dist/aos.css';
import Rules from "./pages/Rules";
import Matches from "./pages/Matches";
import Team from "./pages/Team";
import ScrollManager from "./components/ScrollManager";
import { helix } from 'ldrs'

function App() {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

function AppContent() {
  const { loading } = useAuth();
  helix.register();

  if (loading) {
    return (<div className="h-dvh w-dvw grid place-items-center bg-white"> <l-helix
      size="45"
      speed="2.5"
      color="#263741"
    ></l-helix ></div>);
  }
  return (
    <Router>
      <ScrollManager />
      <Toaster richColors position="top-right" closeButton toastOptions={{
        style: {
          fontWeight: '200',
          letterSpacing: '1px',
        },
      }} />
      <Routes>
        <Route path="*" element={<Navigate to={'/'} />} />
        <Route path="/" element={<Home />} />
        <Route path="/rules" element={<Rules />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/matches" element={<Matches />} />
        <Route path="/team" element={<Team />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
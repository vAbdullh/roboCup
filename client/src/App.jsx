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
import ScrollManager from "./components/ScrollManager";

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
  if (loading) {
    return (<div className="h-dvh w-dvw grid place-items-center"> <l-helix
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
      {/* <div className="fixed bottom-0 right-0 bg-green-400 text-white p-2 flex justify-center items-center gap-1"><Bug color="#fff" />Demo</div> */}
    </Router>
  );
}

export default App;
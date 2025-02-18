// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { Toaster } from "sonner";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthPage from "./pages/Auth";
import AdminDashboard from "./pages/Admin";
import Home from "./pages/Home";
import { Bug } from "lucide-react";

function App() {
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
      <Toaster richColors position="top-right" closeButton />
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="*" element={<Navigate to={'/auth'} />} />
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
      {/* <div className="fixed top-0 right-0 bg-green-400 text-white p-2 flex justify-center items-center gap-1"><Bug color="#fff" />Demo</div> */}
    </Router>
  );
}

export default App;
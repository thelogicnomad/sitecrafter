import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Register";
import Home from "./pages/Home";
import { Builder } from "./pages/Builder";
import { Planning } from "./pages/Planning";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/dashboard" element={<ProtectedRoute />}>
            <Route index element={<Dashboard />} />
          </Route>
          
          <Route element={<ProtectedRoute />}>
            <Route path="/planning" element={<Planning />} />
            <Route path="/builder" element={<Builder />} />
          </Route>

          <Route path="*" element={
            <div className="min-h-screen flex flex-col items-center justify-center">
              <h1 className="text-3xl font-bold mb-4">404 Not Found</h1>
              <p className="mb-4">The page you're looking for doesn't exist.</p>
              <button 
                onClick={() => window.location.href = "/"}
                className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
              >
                Go Home
              </button>
            </div>
          } />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
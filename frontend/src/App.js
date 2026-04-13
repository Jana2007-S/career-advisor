import { useState } from "react";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

function App() {
  const [page, setPage] = useState("dashboard");
  const [formResetKey, setFormResetKey] = useState(0);
  const [profileUser, setProfileUser] = useState(null);

  const openPage = (target) => {
    setPage(target);
    setFormResetKey((prev) => prev + 1);
  };

  const handleLoginSuccess = (user) => {
    setProfileUser(user);
    setPage("profile");
  };

  const handleRegisterSuccess = () => {
    openPage("login");
  };

  const handleLogout = () => {
    setProfileUser(null);
    setPage("dashboard");
  };

  const renderContent = () => {
    if (page === "login") {
      return <Login key={`login-${formResetKey}`} onLoginSuccess={handleLoginSuccess} />;
    }

    if (page === "register") {
      return <Register key={`register-${formResetKey}`} onRegistered={handleRegisterSuccess} />;
    }

    if (page === "profile") {
      return <Profile user={profileUser} onLogout={handleLogout} />;
    }

    return (
      <div className="dashboard">
        <h2>Dashboard</h2>
        <p>Select Login or Register to continue.</p>

        <div className="dashboard-grid">
          <button className="dashboard-card" onClick={() => openPage("login")}> 
            <div className="card-icon">🔐</div>
            <div className="card-title">Login</div>
            <div className="card-description">Already have an account? Sign in here.</div>
          </button>

          <button className="dashboard-card" onClick={() => openPage("register")}> 
            <div className="card-icon">📝</div>
            <div className="card-title">Register</div>
            <div className="card-description">Create a new account and get started.</div>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="container">
      <div className="navbar">
        <div className="logo">💜 Beacon</div>
        <div className="nav-actions">
          <button className="nav-btn" onClick={() => openPage("login")}>Login</button>
          <button className="nav-btn secondary" onClick={() => openPage("register")}>Register</button>
        </div>
      </div>

      <div className="hero">
        <div className="hero-text">
          <h1>
            Beacon — <br />
            <span>Illuminating Your</span> <br />
            Academic & Career Path
          </h1>

          <p>
            AI-driven personalized career guidance for confident decision making.
          </p>

          <div className="hero-buttons">
            <button className="primary-btn" onClick={() => openPage("login")}>Login</button>
            <button className="secondary-btn" onClick={() => openPage("register")}>Register</button>
          </div>
        </div>
      </div>

      <div className="page-area">
        {page !== "dashboard" && page !== "profile" && (
          <button className="back-btn" onClick={() => setPage("dashboard")}>← Back to Dashboard</button>
        )}
        {renderContent()}
      </div>
    </div>
  );
}

export default App;

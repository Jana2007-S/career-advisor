function Profile({ user, onLogout }) {
  if (!user) {
    return null;
  }

  return (
    <div className="card profile-card">
      <h2>Hi, {user.name || "User"}!</h2>
      <p className="profile-subtitle">Welcome back — here are the details you provided.</p>

      <div className="profile-details">
        <div className="profile-row">
          <span className="profile-label">Name:</span>
          <span>{user.name}</span>
        </div>
        <div className="profile-row">
          <span className="profile-label">Email:</span>
          <span>{user.email}</span>
        </div>
        <div className="profile-row">
          <span className="profile-label">Marks:</span>
          <span>{user.marks || "Not provided"}</span>
        </div>
      </div>

      <button className="primary-btn" onClick={onLogout}>Logout</button>
    </div>
  );
}

export default Profile;

function MyProfile() {
  function handleSubmit(e) {
    e.preventDefault();
    alert("Profile updated! (demo)");
  }

  return (
    <div className="admin-card">
      <h3 className="mb-4">My Profile</h3>
      <p className="text-muted mb-4">Update your personal information here.</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="profileName" className="form-label">Full Name</label>
          <input type="text" className="form-control" id="profileName" defaultValue="Admin" required />
        </div>
        <div className="mb-3">
          <label htmlFor="profileEmail" className="form-label">Email</label>
          <input type="email" className="form-control" id="profileEmail" aria-describedby="profileEmailHelp" defaultValue="admin@coffeeclub.com" required />
          <div id="profileEmailHelp" className="form-text">This Email will be used for login.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="profileNewPassword" className="form-label">New Password</label>
          <input type="password" className="form-control" id="profileNewPassword" />
        </div>
        <div className="mb-3">
          <label htmlFor="profileConfirmPassword" className="form-label">Confirm New Password</label>
          <input type="password" className="form-control" id="profileConfirmPassword" />
        </div>
        <button type="submit" className="btn btn-coffee">Save Changes</button>
      </form>
    </div>
  );
}

export default MyProfile;
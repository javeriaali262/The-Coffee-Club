function AdminChangeProfile() {
  function handleProfileUpdate(event) {
    event.preventDefault();
    alert('Admin profile updated! (demo)');
  }

  return (
    <div className="admin-card mx-auto mb-4" style={{ maxWidth: '500px' }}>
      <h3 className="mb-4">Admin: Change Profile</h3>
      <form onSubmit={handleProfileUpdate}>
        <div className="mb-3">
          <label htmlFor="adminProfileName" className="form-label">Full Name</label>
          <input type="text" className="form-control" id="adminProfileName" required />
        </div>
        <div className="mb-3">
          <label htmlFor="adminProfileEmail" className="form-label">Email</label>
          <input type="email" className="form-control" id="adminProfileEmail" required />
        </div>
        <div className="mb-3">
          <label htmlFor="adminProfilePhone" className="form-label">Phone Number</label>
          <input type="tel" className="form-control" id="adminProfilePhone" />
        </div>
        <button type="submit" className="btn btn-coffee">Save Changes</button>
      </form>
    </div>
  );
}

export default AdminChangeProfile;
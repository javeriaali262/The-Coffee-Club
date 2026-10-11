function AdminSignup() {
  function handleSignup(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    if (formData.get('password') !== formData.get('confirmPassword')) {
      alert('Passwords do not match.');
      return;
    }

    alert('Admin account created! (demo)');
  }

  return (
    <div className="admin-card mx-auto mb-4" style={{ maxWidth: '500px' }}>
      <h3 className="mb-4">Admin: Sign Up</h3>
      <form onSubmit={handleSignup}>
        <div className="mb-3">
          <label htmlFor="adminSignupName" className="form-label">Full Name</label>
          <input type="text" className="form-control" id="adminSignupName" required />
        </div>
        <div className="mb-3">
          <label htmlFor="adminSignupEmail" className="form-label">Email</label>
          <input type="email" className="form-control" id="adminSignupEmail" required />
        </div>
        <div className="mb-3">
          <label htmlFor="adminSignupPassword" className="form-label">Password</label>
          <input type="password" className="form-control" id="adminSignupPassword" name="password" minLength="8" required />
        </div>
        <div className="mb-3">
          <label htmlFor="adminSignupConfirmPassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="adminSignupConfirmPassword" name="confirmPassword" minLength="8" required />
        </div>
        <button type="submit" className="btn btn-coffee">Create Account</button>
      </form>
    </div>
  );
}

export default AdminSignup;
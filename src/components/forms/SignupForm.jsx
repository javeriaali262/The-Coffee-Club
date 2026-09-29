function SignupForm() {
  return (
    <div className="admin-card mx-auto">
      <h3 className="mb-4">Sign Up</h3>
      <form onSubmit={(e) => { e.preventDefault(); alert("Account created! (demo)"); }}>
        <div className="mb-3">
          <label htmlFor="signupName" className="form-label">Full Name</label>
          <input type="text" className="form-control" id="signupName" required />
        </div>
        <div className="mb-3">
          <label htmlFor="signupEmail" className="form-label">Email</label>
          <input type="email" className="form-control" id="signupEmail" required />
        </div>
        <div className="mb-3">
          <label htmlFor="signupPassword" className="form-label">Password</label>
          <input type="password" className="form-control" id="signupPassword" required />
        </div>
        <div className="mb-3">
          <label htmlFor="signupConfirm" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="signupConfirm" required />
        </div>
        <button type="submit" className="btn btn-coffee">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupForm;
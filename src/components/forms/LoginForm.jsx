function LoginForm() {
  return (
    <div className="admin-card mx-auto">
      <h3 className="mb-4">Login</h3>
      <form onSubmit={(e) => { e.preventDefault(); alert("Login successful! (demo)"); }}>
        <div className="mb-3">
          <label htmlFor="loginEmail" className="form-label">Email</label>
          <input type="email" className="form-control" id="loginEmail" required />
        </div>
        <div className="mb-3">
          <label htmlFor="loginPassword" className="form-label">Password</label>
          <input type="password" className="form-control" id="loginPassword" required />
        </div>
        <button type="submit" className="btn btn-coffee">Login</button>
      </form>
    </div>
  );
}

export default LoginForm;
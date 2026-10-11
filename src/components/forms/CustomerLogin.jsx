function CustomerLogin() {
  return (
    <div className="admin-card mx-auto mb-4" style={{ maxWidth: '500px' }}>
      <h3 className="mb-4">Customer: Login</h3>
      <form onSubmit={(e) => { e.preventDefault(); alert("Customer login successful! (demo)"); }}>
        <div className="mb-3">
          <label htmlFor="customerLoginEmail" className="form-label">Email</label>
          <input type="email" className="form-control" id="customerLoginEmail" placeholder="example@gmail.com" required />
        </div>
        <div className="mb-3">
          <label htmlFor="customerLoginPassword" className="form-label">Password</label>
          <input type="password" className="form-control" id="customerLoginPassword" placeholder="Enter your password" required />
        </div>
        <button type="submit" className="btn btn-coffee">Login</button>
      </form>
    </div>
  );
}

export default CustomerLogin;
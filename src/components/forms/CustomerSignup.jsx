function CustomerSignup() {
  return (
    <div className="admin-card mx-auto mb-4" style={{ maxWidth: '500px' }}>
      <h3 className="mb-4">Customer: Sign Up</h3>
      <form onSubmit={(e) => { e.preventDefault(); alert("Customer account created! (demo)"); }}>
        <div className="mb-3">
          <label htmlFor="customerSignupName" className="form-label">Full Name</label>
          <input type="text" className="form-control" id="customerSignupName" placeholder="Enter your full name" required />
        </div>
        <div className="mb-3">
          <label htmlFor="customerSignupEmail" className="form-label">Email</label>
          <input type="email" className="form-control" id="customerSignupEmail" placeholder="example@gmail.com" required />
        </div>
        <div className="mb-3">
          <label htmlFor="customerSignupPassword" className="form-label">Password</label>
          <input type="password" className="form-control" id="customerSignupPassword" placeholder="Create a password" required />
        </div>
        <div className="mb-3">
          <label htmlFor="customerSignupConfirm" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="customerSignupConfirm" placeholder="Re-enter your password" required />
        </div>
        <button type="submit" className="btn btn-coffee">Sign Up</button>
      </form>
    </div>
  );
}

export default CustomerSignup;
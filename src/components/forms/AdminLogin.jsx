import { useNavigate } from 'react-router-dom';

function AdminLogin() {
  const navigate = useNavigate();

  function handleLogin(event) {
    event.preventDefault();
    sessionStorage.setItem('adminAuthenticated', 'true');
    navigate('/admin');
  }

  return (
    <div className="admin-card mx-auto mb-4" style={{ maxWidth: '500px' }}>
      <h3 className="mb-4">Admin: Login</h3>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label htmlFor="adminLoginEmail" className="form-label">Email</label>
          <input type="email" className="form-control" id="adminLoginEmail" placeholder="admin@coffeeclub.com" required />
        </div>
        <div className="mb-4">
          <label htmlFor="adminLoginPassword" className="form-label">Password</label>
          <input type="password" className="form-control" id="adminLoginPassword" placeholder="Enter your password" required />
        </div>
        <button type="submit" className="btn btn-coffee">Login</button>
      </form>
    </div>
  );
}

export default AdminLogin;
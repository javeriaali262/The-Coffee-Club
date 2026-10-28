import { useNavigate } from 'react-router-dom';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { loginAdmin } from '../../services/api';

// Ensure the admin enters a valid email and a non-empty password.
const loginSchema = z.object({
  email: z.email('Enter a valid email address.'),
  password: z.string().min(1, 'Password is required.'),
});

function AdminLogin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  // Validate login inputs before running the existing navigation action.
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  async function handleLogin(data) {
    try {
      const result = await loginAdmin(data);
      sessionStorage.setItem('adminAuthenticated', 'true');
      sessionStorage.setItem('adminEmail', result.data.email);
      navigate('/admin');
    } catch (error) {
      console.error('Error logging in admin:', error);
      alert(error.response?.data?.message || 'Unable to log in.');
    }
  }

  return (
    <div className="admin-card mx-auto mb-4" style={{ maxWidth: '500px' }}>
      <h3 className="mb-4">Admin: Login</h3>
      <form noValidate onSubmit={handleSubmit(handleLogin)}>
        <div className="mb-3">
          <label htmlFor="adminLoginEmail" className="form-label">Email</label>
          <input type="email" className="form-control" id="adminLoginEmail" placeholder="admin@coffeeclub.com" {...register('email')} />
          {errors.email && <div className="text-danger">{errors.email.message}</div>}
        </div>
        <div className="mb-4">
          <label htmlFor="adminLoginPassword" className="form-label">Password</label>
          <input type={showPassword ? 'text' : 'password'} className="form-control" id="adminLoginPassword" placeholder="Enter your password" {...register('password')} />
          {errors.password && <div className="text-danger">{errors.password.message}</div>}
        </div>
        <div className="form-check mb-3">
          <input className="form-check-input" type="checkbox" id="adminLoginShowPassword" checked={showPassword} onChange={(event) => setShowPassword(event.target.checked)} />
          <label className="form-check-label" htmlFor="adminLoginShowPassword">Show password</label>
        </div>
        <button type="submit" className="btn btn-coffee">Login</button>
      </form>
    </div>
  );
}

export default AdminLogin;
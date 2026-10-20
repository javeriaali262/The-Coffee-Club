import { useNavigate } from 'react-router-dom';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// Ensure the admin enters a valid email and a non-empty password.
const loginSchema = z.object({
  email: z.email('Enter a valid email address.'),
  password: z.string().min(1, 'Password is required.'),
});

function AdminLogin() {
  const navigate = useNavigate();
  // Validate login inputs before running the existing navigation action.
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  function handleLogin() {
    sessionStorage.setItem('adminAuthenticated', 'true');
    navigate('/admin');
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
          <input type="password" className="form-control" id="adminLoginPassword" placeholder="Enter your password" {...register('password')} />
          {errors.password && <div className="text-danger">{errors.password.message}</div>}
        </div>
        <button type="submit" className="btn btn-coffee">Login</button>
      </form>
    </div>
  );
}

export default AdminLogin;
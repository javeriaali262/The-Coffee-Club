import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// Check the customer email format and require a password.
const loginSchema = z.object({
  email: z.email('Enter a valid email address.'),
  password: z.string().min(1, 'Password is required.'),
});

function CustomerLogin() {
  // Validate registered login fields before allowing the demo submission.
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  function handleLogin() {
    alert('Customer login successful! (demo)');
  }

  return (
    <div className="admin-card mx-auto mb-4" style={{ maxWidth: '500px' }}>
      <h3 className="mb-4">Customer: Login</h3>
      <form onSubmit={handleSubmit(handleLogin)}>
        {Object.values(errors).map((error, index) => (
          <div className="text-danger" key={`${error.message}-${index}`} role="alert">{error.message}</div>
        ))}
        <div className="mb-3">
          <label htmlFor="customerLoginEmail" className="form-label">Email</label>
          <input type="email" className="form-control" id="customerLoginEmail" placeholder="example@gmail.com" required {...register('email')} />
        </div>
        <div className="mb-3">
          <label htmlFor="customerLoginPassword" className="form-label">Password</label>
          <input type="password" className="form-control" id="customerLoginPassword" placeholder="Enter your password" required {...register('password')} />
        </div>
        <button type="submit" className="btn btn-coffee">Login</button>
      </form>
    </div>
  );
}

export default CustomerLogin;
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// Validate the signup details and make sure both password fields match.
const signupSchema = z.object({
  name: z.string().trim().min(1, 'Full name is required.'),
  email: z.email('Enter a valid email address.'),
  password: z.string().min(8, 'Password must be at least 8 characters.'),
  confirmPassword: z.string().min(8, 'Confirm your password.'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match.',
  path: ['confirmPassword'],
});

function AdminSignup() {
  // Register the signup fields and expose Zod validation errors.
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(signupSchema) });

  function handleSignup() {
    alert('Admin account created! (demo)');
  }

  return (
    <div className="admin-card mx-auto mb-4" style={{ maxWidth: '500px' }}>
      <h3 className="mb-4">Admin: Sign Up</h3>
      <form onSubmit={handleSubmit(handleSignup)}>
        {Object.values(errors).map((error, index) => (
          <div className="text-danger" key={`${error.message}-${index}`} role="alert">{error.message}</div>
        ))}
        <div className="mb-3">
          <label htmlFor="adminSignupName" className="form-label">Full Name</label>
          <input type="text" className="form-control" id="adminSignupName" required {...register('name')} />
        </div>
        <div className="mb-3">
          <label htmlFor="adminSignupEmail" className="form-label">Email</label>
          <input type="email" className="form-control" id="adminSignupEmail" required {...register('email')} />
        </div>
        <div className="mb-3">
          <label htmlFor="adminSignupPassword" className="form-label">Password</label>
          <input type="password" className="form-control" id="adminSignupPassword" name="password" minLength="8" required {...register('password')} />
        </div>
        <div className="mb-3">
          <label htmlFor="adminSignupConfirmPassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="adminSignupConfirmPassword" name="confirmPassword" minLength="8" required {...register('confirmPassword')} />
        </div>
        <button type="submit" className="btn btn-coffee">Create Account</button>
      </form>
    </div>
  );
}

export default AdminSignup;
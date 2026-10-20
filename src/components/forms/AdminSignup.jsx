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
      <form noValidate onSubmit={handleSubmit(handleSignup)}>
        <div className="mb-3">
          <label htmlFor="adminSignupName" className="form-label">Full Name</label>
          <input type="text" className="form-control" id="adminSignupName" {...register('name')} />
          {errors.name && <div className="text-danger">{errors.name.message}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="adminSignupEmail" className="form-label">Email</label>
          <input type="email" className="form-control" id="adminSignupEmail" {...register('email')} />
          {errors.email && <div className="text-danger">{errors.email.message}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="adminSignupPassword" className="form-label">Password</label>
          <input type="password" className="form-control" id="adminSignupPassword" minLength="8" {...register('password')} />
          {errors.password && <div className="text-danger">{errors.password.message}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="adminSignupConfirmPassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="adminSignupConfirmPassword" minLength="8" {...register('confirmPassword')} />
          {errors.confirmPassword && <div className="text-danger">{errors.confirmPassword.message}</div>}
        </div>
        <button type="submit" className="btn btn-coffee">Create Account</button>
      </form>
    </div>
  );
}

export default AdminSignup;
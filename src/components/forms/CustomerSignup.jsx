import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// Validate signup fields and report a mismatch on the confirm-password field.
const signupSchema = z.object({
  name: z.string().trim().min(1, 'Full name is required.'),
  email: z.email('Enter a valid email address.'),
  password: z.string().min(1, 'Password is required.'),
  confirmPassword: z.string().min(1, 'Please confirm your password.'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match.',
  path: ['confirmPassword'],
});

function CustomerSignup() {
  // Register signup fields and provide their Zod validation errors.
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(signupSchema) });

  function handleSignup() {
    alert('Customer account created! (demo)');
  }

  return (
    <div className="admin-card mx-auto mb-4" style={{ maxWidth: '500px' }}>
      <h3 className="mb-4">Customer: Sign Up</h3>
      <form onSubmit={handleSubmit(handleSignup)}>
        {Object.values(errors).map((error, index) => (
          <div className="text-danger" key={`${error.message}-${index}`} role="alert">{error.message}</div>
        ))}
        <div className="mb-3">
          <label htmlFor="customerSignupName" className="form-label">Full Name</label>
          <input type="text" className="form-control" id="customerSignupName" placeholder="Enter your full name" required {...register('name')} />
        </div>
        <div className="mb-3">
          <label htmlFor="customerSignupEmail" className="form-label">Email</label>
          <input type="email" className="form-control" id="customerSignupEmail" placeholder="example@gmail.com" required {...register('email')} />
        </div>
        <div className="mb-3">
          <label htmlFor="customerSignupPassword" className="form-label">Password</label>
          <input type="password" className="form-control" id="customerSignupPassword" placeholder="Create a password" required {...register('password')} />
        </div>
        <div className="mb-3">
          <label htmlFor="customerSignupConfirm" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="customerSignupConfirm" placeholder="Re-enter your password" required {...register('confirmPassword')} />
        </div>
        <button type="submit" className="btn btn-coffee">Sign Up</button>
      </form>
    </div>
  );
}

export default CustomerSignup;
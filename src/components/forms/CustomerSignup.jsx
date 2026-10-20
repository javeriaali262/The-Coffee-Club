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
      <form noValidate onSubmit={handleSubmit(handleSignup)}>
        <div className="mb-3">
          <label htmlFor="customerSignupName" className="form-label">Full Name</label>
          <input type="text" className="form-control" id="customerSignupName" placeholder="Enter your full name" {...register('name')} />
          {errors.name && <div className="text-danger">{errors.name.message}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="customerSignupEmail" className="form-label">Email</label>
          <input type="email" className="form-control" id="customerSignupEmail" placeholder="example@gmail.com" {...register('email')} />
          {errors.email && <div className="text-danger">{errors.email.message}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="customerSignupPassword" className="form-label">Password</label>
          <input type="password" className="form-control" id="customerSignupPassword" placeholder="Create a password" {...register('password')} />
          {errors.password && <div className="text-danger">{errors.password.message}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="customerSignupConfirm" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="customerSignupConfirm" placeholder="Re-enter your password" {...register('confirmPassword')} />
          {errors.confirmPassword && <div className="text-danger">{errors.confirmPassword.message}</div>}
        </div>
        <button type="submit" className="btn btn-coffee">Sign Up</button>
      </form>
    </div>
  );
}

export default CustomerSignup;
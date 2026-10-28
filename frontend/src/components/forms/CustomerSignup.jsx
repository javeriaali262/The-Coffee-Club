import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { signupCustomer } from '../../services/api';

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
  const [showPasswords, setShowPasswords] = useState(false);
  // Register signup fields and provide their Zod validation errors.
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(signupSchema) });

  async function handleSignup(data) {
    try {
      const result = await signupCustomer(data);
      alert(result.data.message);
    } catch (error) {
      console.error('Error creating customer account:', error);
      alert(error.response?.data?.message || 'Unable to create customer account.');
    }
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
          <input type={showPasswords ? 'text' : 'password'} className="form-control" id="customerSignupPassword" placeholder="Create a password" {...register('password')} />
          {errors.password && <div className="text-danger">{errors.password.message}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="customerSignupConfirm" className="form-label">Confirm Password</label>
          <input type={showPasswords ? 'text' : 'password'} className="form-control" id="customerSignupConfirm" placeholder="Re-enter your password" {...register('confirmPassword')} />
          {errors.confirmPassword && <div className="text-danger">{errors.confirmPassword.message}</div>}
        </div>
        <div className="form-check mb-3">
          <input className="form-check-input" type="checkbox" id="customerSignupShowPassword" checked={showPasswords} onChange={(event) => setShowPasswords(event.target.checked)} />
          <label className="form-check-label" htmlFor="customerSignupShowPassword">Show passwords</label>
        </div>
        <button type="submit" className="btn btn-coffee">Sign Up</button>
      </form>
    </div>
  );
}

export default CustomerSignup;
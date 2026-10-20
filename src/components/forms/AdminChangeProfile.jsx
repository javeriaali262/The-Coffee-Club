import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// Validate every profile field before saving.
const profileSchema = z.object({
  name: z.string().trim().min(1, 'Full name is required.'),
  email: z.email('Enter a valid email address.'),
  phone: z.string().trim().min(1, 'Phone number is required.'),
});

function AdminChangeProfile() {
  // Register profile inputs and use the Zod schema to validate submissions.
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(profileSchema) });

  function handleProfileUpdate() {
    alert('Admin profile updated! (demo)');
  }

  return (
    <div className="admin-card mx-auto mb-4" style={{ maxWidth: '500px' }}>
      <h3 className="mb-4">Admin: Change Profile</h3>
      <form noValidate onSubmit={handleSubmit(handleProfileUpdate)}>
        <div className="mb-3">
          <label htmlFor="adminProfileName" className="form-label">Full Name</label>
          <input type="text" className="form-control" id="adminProfileName" {...register('name')} />
          {errors.name && <div className="text-danger">{errors.name.message}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="adminProfileEmail" className="form-label">Email</label>
          <input type="email" className="form-control" id="adminProfileEmail" {...register('email')} />
          {errors.email && <div className="text-danger">{errors.email.message}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="adminProfilePhone" className="form-label">Phone Number</label>
          <input type="tel" className="form-control" id="adminProfilePhone" {...register('phone')} />
          {errors.phone && <div className="text-danger">{errors.phone.message}</div>}
        </div>
        <button type="submit" className="btn btn-coffee">Save Changes</button>
      </form>
    </div>
  );
}

export default AdminChangeProfile;
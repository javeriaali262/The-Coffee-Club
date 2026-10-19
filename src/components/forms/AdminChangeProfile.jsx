import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// Validate the required profile fields while allowing the phone number to be empty.
const profileSchema = z.object({
  name: z.string().trim().min(1, 'Full name is required.'),
  email: z.email('Enter a valid email address.'),
  phone: z.string().optional(),
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
      <form onSubmit={handleSubmit(handleProfileUpdate)}>
        <div className="mb-3">
          <label htmlFor="adminProfileName" className="form-label">Full Name</label>
          <input type="text" className="form-control" id="adminProfileName" required {...register('name')} />
          {/* Display validation messages next to the fields they describe. */}
          {errors.name && <div className="text-danger">{errors.name.message}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="adminProfileEmail" className="form-label">Email</label>
          <input type="email" className="form-control" id="adminProfileEmail" required {...register('email')} />
          {errors.email && <div className="text-danger">{errors.email.message}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="adminProfilePhone" className="form-label">Phone Number</label>
          <input type="tel" className="form-control" id="adminProfilePhone" {...register('phone')} />
        </div>
        <button type="submit" className="btn btn-coffee">Save Changes</button>
      </form>
    </div>
  );
}

export default AdminChangeProfile;
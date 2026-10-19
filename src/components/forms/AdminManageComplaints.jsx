import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// Validate the selected complaint and action; a reply is optional.
const complaintSchema = z.object({
  complaint: z.string().min(1),
  action: z.string().min(1),
  reply: z.string().optional(),
});

function AdminManageComplaints() {
  // Connect the complaint form to its Zod validation schema.
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(complaintSchema) });

  function handleComplaintUpdate() {
    alert('Complaint updated! (demo)');
  }

  return (
    <div className="admin-card mx-auto mb-4" style={{ maxWidth: '500px' }}>
      <h3 className="mb-4">Admin: Manage Complaints</h3>
      <form onSubmit={handleSubmit(handleComplaintUpdate)}>
        {Object.values(errors).map((error, index) => (
          <div className="text-danger" key={`${error.message}-${index}`} role="alert">{error.message}</div>
        ))}
        <div className="mb-3">
          <label htmlFor="adminComplaintSelect" className="form-label">Select Complaint</label>
          <select className="form-select" id="adminComplaintSelect" {...register('complaint')}>
            <option>Bilal Ahmed — Order kaafi late aaya</option>
            <option>Sara Khan — Pizza thanda mila</option>
          </select>
          <div className="form-text">Choose the complaint you want to act on.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="adminComplaintAction" className="form-label">Action</label>
          <select className="form-select" id="adminComplaintAction" {...register('action')}>
            <option>Process / Update</option>
            <option>Resolve / Delete</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="adminComplaintReply" className="form-label">Reply to Customer</label>
          <textarea className="form-control" id="adminComplaintReply" rows="3" placeholder="Write your reply" {...register('reply')}></textarea>
        </div>
        <button type="submit" className="btn btn-coffee">Submit</button>
      </form>
    </div>
  );
}

export default AdminManageComplaints;
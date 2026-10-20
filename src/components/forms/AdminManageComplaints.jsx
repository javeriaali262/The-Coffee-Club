import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// Require a complaint selection, action, and customer reply.
const complaintSchema = z.object({
  complaint: z.string().min(1, 'Select a complaint.'),
  action: z.string().min(1, 'Select an action.'),
  reply: z.string().trim().min(1, 'Please enter a reply to the customer.'),
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
      <form noValidate onSubmit={handleSubmit(handleComplaintUpdate)}>
        <div className="mb-3">
          <label htmlFor="adminComplaintSelect" className="form-label">Select Complaint</label>
          <select className="form-select" id="adminComplaintSelect" {...register('complaint')}>
            <option value="">Choose a complaint...</option>
            <option>Bilal Ahmed — Order kaafi late aaya</option>
            <option>Sara Khan — Pizza thanda mila</option>
          </select>
          {errors.complaint && <div className="text-danger">{errors.complaint.message}</div>}
          <div className="form-text">Choose the complaint you want to act on.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="adminComplaintAction" className="form-label">Action</label>
          <select className="form-select" id="adminComplaintAction" {...register('action')}>
            <option value="">Choose an action...</option>
            <option>Process / Update</option>
            <option>Resolve / Delete</option>
          </select>
          {errors.action && <div className="text-danger">{errors.action.message}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="adminComplaintReply" className="form-label">Reply to Customer</label>
          <textarea className="form-control" id="adminComplaintReply" rows="3" placeholder="Write your reply" {...register('reply')}></textarea>
          {errors.reply && <div className="text-danger">{errors.reply.message}</div>}
        </div>
        <button type="submit" className="btn btn-coffee">Submit</button>
      </form>
    </div>
  );
}

export default AdminManageComplaints;
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { getComplaints, updateComplaint } from '../../services/api';

// Require a complaint selection, action, and customer reply.
const complaintSchema = z.object({
  complaint: z.string().min(1, 'Select a complaint.'),
  action: z.string().min(1, 'Select an action.'),
  reply: z.string().trim().min(1, 'Please enter a reply to the customer.'),
});

function AdminManageComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [loadError, setLoadError] = useState('');

  useEffect(() => {
    async function loadComplaints() {
      try {
        const result = await getComplaints();
        setComplaints(result.data);
      } catch (error) {
        console.error('Error fetching complaints:', error);
        setLoadError(error.response?.data?.message || 'Unable to load complaints.');
      }
    }

    loadComplaints();
  }, []);

  // Connect the complaint form to its Zod validation schema.
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(complaintSchema) });

  async function handleComplaintUpdate(data) {
    try {
      const result = await updateComplaint(data.complaint, {
        status: data.action === 'Resolve / Delete' ? 'Resolved' : 'In Review',
        reply: data.reply,
      });
      setComplaints((currentComplaints) =>
        currentComplaints.map((complaint) =>
          complaint.complaintId === data.complaint ? result.data.complaint : complaint
        )
      );
      alert(result.data.message);
    } catch (error) {
      console.error('Error updating complaint:', error);
      alert(error.response?.data?.message || 'Unable to update complaint.');
    }
  }

  return (
    <div className="admin-card mx-auto mb-4" style={{ maxWidth: '500px' }}>
      <h3 className="mb-4">Admin: Manage Complaints</h3>
      <form noValidate onSubmit={handleSubmit(handleComplaintUpdate)}>
        <div className="mb-3">
          <label htmlFor="adminComplaintSelect" className="form-label">Select Complaint</label>
          <select className="form-select" id="adminComplaintSelect" {...register('complaint')}>
            <option value="">Choose a complaint...</option>
            {complaints.map((complaint) => (
              <option key={complaint.complaintId} value={complaint.complaintId}>
                {complaint.name} - {complaint.type} ({complaint.status})
              </option>
            ))}
          </select>
          {loadError && <div className="text-danger">{loadError}</div>}
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
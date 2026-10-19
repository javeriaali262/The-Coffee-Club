import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// Require the customer and order details needed to review a complaint.
const complaintSchema = z.object({
  name: z.string().trim().min(1, 'Your name is required.'),
  orderNumber: z.string().trim().min(1, 'Order number is required.'),
  type: z.string().min(1),
  details: z.string().trim().min(1, 'Please describe your complaint.'),
});

function CustomerComplaint() {
  // Register complaint inputs and validate them through the Zod resolver.
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(complaintSchema) });

  function handleComplaintSubmit() {
    alert('Complaint submitted! (demo)');
  }

  return (
    <div className="admin-card mx-auto mb-4" style={{ maxWidth: '500px' }}>
      <h3 className="mb-4">Customer: Complaint</h3>
      <form onSubmit={handleSubmit(handleComplaintSubmit)}>
        {Object.values(errors).map((error, index) => (
          <div className="text-danger" key={`${error.message}-${index}`} role="alert">{error.message}</div>
        ))}
        <div className="mb-3">
          <label htmlFor="customerComplaintName" className="form-label">Your Name</label>
          <input type="text" className="form-control" id="customerComplaintName" placeholder="Enter your name" required {...register('name')} />
        </div>
        <div className="mb-3">
          <label htmlFor="customerComplaintOrder" className="form-label">Order Number</label>
          <input type="text" className="form-control" id="customerComplaintOrder" placeholder="e.g. #101" required {...register('orderNumber')} />
        </div>
        <div className="mb-3">
          <label htmlFor="customerComplaintType" className="form-label">Complaint Type</label>
          <select className="form-select" id="customerComplaintType" {...register('type')}>
            <option>Order was late</option>
            <option>Food was cold</option>
            <option>Wrong item received</option>
            <option>Bad service</option>
            <option>Other</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="customerComplaintDetails" className="form-label">Details</label>
          <textarea className="form-control" id="customerComplaintDetails" rows="3" placeholder="Write what happened" required {...register('details')}></textarea>
        </div>
        <button type="submit" className="btn btn-coffee">Submit Complaint</button>
      </form>
    </div>
  );
}

export default CustomerComplaint;
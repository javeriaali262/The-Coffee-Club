import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// Require the customer and order details needed to review a complaint.
const complaintSchema = z.object({
  name: z.string().trim().min(1, 'Your name is required.'),
  orderNumber: z.string().trim().min(1, 'Order number is required.'),
  type: z.string().min(1, 'Please select a complaint type.'),
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
      <form noValidate onSubmit={handleSubmit(handleComplaintSubmit)}>
        <div className="mb-3">
          <label htmlFor="customerComplaintName" className="form-label">Your Name</label>
          <input type="text" className="form-control" id="customerComplaintName" placeholder="Enter your name" {...register('name')} />
          {errors.name && <div className="text-danger">{errors.name.message}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="customerComplaintOrder" className="form-label">Order Number</label>
          <input type="text" className="form-control" id="customerComplaintOrder" placeholder="e.g. #101" {...register('orderNumber')} />
          {errors.orderNumber && <div className="text-danger">{errors.orderNumber.message}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="customerComplaintType" className="form-label">Complaint Type</label>
          <select className="form-select" id="customerComplaintType" {...register('type')}>
            <option value="">Choose a complaint type...</option>
            <option>Order was late</option>
            <option>Food was cold</option>
            <option>Wrong item received</option>
            <option>Bad service</option>
            <option>Other</option>
          </select>
          {errors.type && <div className="text-danger">{errors.type.message}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="customerComplaintDetails" className="form-label">Details</label>
          <textarea className="form-control" id="customerComplaintDetails" rows="3" placeholder="Write what happened" {...register('details')}></textarea>
          {errors.details && <div className="text-danger">{errors.details.message}</div>}
        </div>
        <button type="submit" className="btn btn-coffee">Submit Complaint</button>
      </form>
    </div>
  );
}

export default CustomerComplaint;
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// Require delivery details; payment can be empty or a non-negative amount.
const dropOrderSchema = z.object({
  order: z.string().min(1),
  customerName: z.string().trim().min(1, 'Customer name is required.'),
  address: z.string().trim().min(1, 'Drop address is required.'),
  time: z.string().min(1, 'Drop time is required.'),
  payment: z.string().refine((value) => value === '' || Number(value) >= 0, 'Payment must be 0 or more.'),
});

function RiderDropOrder() {
  // Validate the registered delivery fields before confirming a drop-off.
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(dropOrderSchema),
    defaultValues: { payment: '' },
  });

  function handleOrderDrop() {
    alert('Order delivered! (demo)');
  }

  return (
    <div className="admin-card mx-auto mb-4" style={{ maxWidth: '500px' }}>
      <h3 className="mb-4">Rider: Drop Order</h3>
      <form onSubmit={handleSubmit(handleOrderDrop)}>
        {Object.values(errors).map((error, index) => (
          <div className="text-danger" key={`${error.message}-${index}`} role="alert">{error.message}</div>
        ))}
        <div className="mb-3">
          <label htmlFor="riderDropOrder" className="form-label">Select Order</label>
          <select className="form-select" id="riderDropOrder" {...register('order')}>
            <option>#101 - Bilal - Margherita Pizza</option>
            <option>#102 - Sara - Cappuccino</option>
            <option>#103 - Ali - Chocolate Shake</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="riderDropName" className="form-label">Customer Name</label>
          <input type="text" className="form-control" id="riderDropName" placeholder="Enter customer name" required {...register('customerName')} />
        </div>
        <div className="mb-3">
          <label htmlFor="riderDropAddress" className="form-label">Drop Address</label>
          <input type="text" className="form-control" id="riderDropAddress" placeholder="House no, street, city" required {...register('address')} />
        </div>
        <div className="mb-3">
          <label htmlFor="riderDropTime" className="form-label">Drop Time</label>
          <input type="time" className="form-control" id="riderDropTime" required {...register('time')} />
        </div>
        <div className="mb-3">
          <label htmlFor="riderDropPayment" className="form-label">Payment Collected (Rs.)</label>
          <input type="number" className="form-control" id="riderDropPayment" placeholder="e.g. 900" {...register('payment')} />
          <div className="form-text">Leave empty if the customer already paid online.</div>
        </div>
        <button type="submit" className="btn btn-coffee">Confirm Drop</button>
      </form>
    </div>
  );
}

export default RiderDropOrder;
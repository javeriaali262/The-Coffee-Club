import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// Require pickup details while keeping the existing location as the default.
const pickupOrderSchema = z.object({
  order: z.string().min(1, 'Select an order.'),
  location: z.string().trim().min(1, 'Pickup location is required.'),
  time: z.string().min(1, 'Pickup time is required.'),
  note: z.string().trim().min(1, 'Please enter a pickup note.'),
});

function RiderPickupOrder() {
  // Register rider inputs and validate them with the pickup schema.
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(pickupOrderSchema),
    defaultValues: { location: 'The Coffee Club' },
  });

  function handleOrderPickup() {
    alert('Order picked up! (demo)');
  }

  return (
    <div className="admin-card mx-auto mb-4" style={{ maxWidth: '500px' }}>
      <h3 className="mb-4">Rider: Pickup Order</h3>
      <form noValidate onSubmit={handleSubmit(handleOrderPickup)}>
        <div className="mb-3">
          <label htmlFor="riderPickupOrder" className="form-label">Select Order</label>
          <select className="form-select" id="riderPickupOrder" {...register('order')}>
            <option value="">Choose an order...</option>
            <option>#101 - Bilal - Margherita Pizza</option>
            <option>#102 - Sara - Cappuccino</option>
            <option>#103 - Ali - Chocolate Shake</option>
          </select>
          {errors.order && <div className="text-danger">{errors.order.message}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="riderPickupLocation" className="form-label">Pickup Location</label>
          <input type="text" className="form-control" id="riderPickupLocation" {...register('location')} />
          {errors.location && <div className="text-danger">{errors.location.message}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="riderPickupTime" className="form-label">Pickup Time</label>
          <input type="time" className="form-control" id="riderPickupTime" {...register('time')} />
          {errors.time && <div className="text-danger">{errors.time.message}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="riderPickupNote" className="form-label">Note</label>
          <textarea className="form-control" id="riderPickupNote" rows="3" placeholder="e.g. Order packed properly, 2 items" {...register('note')}></textarea>
          {errors.note && <div className="text-danger">{errors.note.message}</div>}
        </div>
        <button type="submit" className="btn btn-coffee">Confirm Pickup</button>
      </form>
    </div>
  );
}

export default RiderPickupOrder;
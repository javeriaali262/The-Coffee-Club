import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// Require pickup details while keeping the existing location as the default.
const pickupOrderSchema = z.object({
  order: z.string().min(1),
  location: z.string().trim().min(1, 'Pickup location is required.'),
  time: z.string().min(1, 'Pickup time is required.'),
  note: z.string().optional(),
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
      <form onSubmit={handleSubmit(handleOrderPickup)}>
        {Object.values(errors).map((error, index) => (
          <div className="text-danger" key={`${error.message}-${index}`} role="alert">{error.message}</div>
        ))}
        <div className="mb-3">
          <label htmlFor="riderPickupOrder" className="form-label">Select Order</label>
          <select className="form-select" id="riderPickupOrder" {...register('order')}>
            <option>#101 - Bilal - Margherita Pizza</option>
            <option>#102 - Sara - Cappuccino</option>
            <option>#103 - Ali - Chocolate Shake</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="riderPickupLocation" className="form-label">Pickup Location</label>
          <input type="text" className="form-control" id="riderPickupLocation" {...register('location')} />
        </div>
        <div className="mb-3">
          <label htmlFor="riderPickupTime" className="form-label">Pickup Time</label>
          <input type="time" className="form-control" id="riderPickupTime" required {...register('time')} />
        </div>
        <div className="mb-3">
          <label htmlFor="riderPickupNote" className="form-label">Note</label>
          <textarea className="form-control" id="riderPickupNote" rows="3" placeholder="e.g. Order packed properly, 2 items" {...register('note')}></textarea>
        </div>
        <button type="submit" className="btn btn-coffee">Confirm Pickup</button>
      </form>
    </div>
  );
}

export default RiderPickupOrder;
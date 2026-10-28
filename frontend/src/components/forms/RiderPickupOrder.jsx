import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { getOrders, pickupOrder } from '../../services/api';

// Require pickup details while keeping the existing location as the default.
const pickupOrderSchema = z.object({
  order: z.string().min(1, 'Select an order.'),
  location: z.string().trim().min(1, 'Pickup location is required.'),
  time: z.string().min(1, 'Pickup time is required.'),
  note: z.string().trim().min(1, 'Please enter a pickup note.'),
});

function RiderPickupOrder() {
  const [orders, setOrders] = useState([]);
  const [loadError, setLoadError] = useState('');

  useEffect(() => {
    async function loadOrders() {
      try {
        const result = await getOrders();
        setOrders(result.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setLoadError(error.response?.data?.message || 'Unable to load orders.');
      }
    }

    loadOrders();
  }, []);

  // Register rider inputs and validate them with the pickup schema.
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(pickupOrderSchema),
    defaultValues: { location: 'The Coffee Club' },
  });

  async function handleOrderPickup(data) {
    try {
      const result = await pickupOrder(data.order, {
        location: data.location,
        time: data.time,
        note: data.note,
      });
      alert(result.data.message);
    } catch (error) {
      console.error('Error confirming pickup:', error);
      alert(error.response?.data?.message || 'Unable to confirm pickup.');
    }
  }

  return (
    <div className="admin-card mx-auto mb-4" style={{ maxWidth: '500px' }}>
      <h3 className="mb-4">Rider: Pickup Order</h3>
      <form noValidate onSubmit={handleSubmit(handleOrderPickup)}>
        <div className="mb-3">
          <label htmlFor="riderPickupOrder" className="form-label">Select Order</label>
          <select className="form-select" id="riderPickupOrder" {...register('order')}>
            <option value="">Choose an order...</option>
            {orders.map((order) => (
              <option key={order.orderId} value={order.orderId}>
                {order.name} - {order.item} ({order.status})
              </option>
            ))}
          </select>
          {loadError && <div className="text-danger">{loadError}</div>}
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
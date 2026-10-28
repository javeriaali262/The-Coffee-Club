import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { getOrders, updateOrderStatus } from '../../services/api';

// Require an order and status selection before updating an order.
const orderSchema = z.object({
  order: z.string().min(1, 'Select an order.'),
  status: z.string().min(1, 'Select an order status.'),
});

function AdminManageOrders() {
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

  // Validate registered order fields before running the existing update action.
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(orderSchema) });

  async function handleOrderUpdate(data) {
    try {
      const result = await updateOrderStatus(data.order, data.status);
      setOrders((currentOrders) =>
        currentOrders.map((order) => order.orderId === data.order ? result.data.order : order)
      );
      alert(result.data.message);
    } catch (error) {
      console.error('Error updating order status:', error);
      alert(error.response?.data?.message || 'Unable to update order status.');
    }
  }

  return (
    <div className="admin-card mx-auto mb-4" style={{ maxWidth: '500px' }}>
      <h3 className="mb-4">Admin: Manage Orders</h3>
      <form noValidate onSubmit={handleSubmit(handleOrderUpdate)}>
        <div className="mb-3">
          <label htmlFor="adminOrderSelect" className="form-label">Select Order</label>
          <select className="form-select" id="adminOrderSelect" {...register('order')}>
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
          <label htmlFor="adminOrderStatus" className="form-label">Order Status</label>
          <select className="form-select" id="adminOrderStatus" {...register('status')}>
            <option value="">Choose a status...</option>
            <option>Pending</option>
            <option>Preparing</option>
            <option>Ready for Delivery</option>
            <option>Delivered</option>
            <option>Cancelled</option>
          </select>
          {errors.status && <div className="text-danger">{errors.status.message}</div>}
        </div>
        <button type="submit" className="btn btn-coffee">Update Status</button>
      </form>
    </div>
  );
}

export default AdminManageOrders;
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// Require an order and status selection before updating an order.
const orderSchema = z.object({
  order: z.string().min(1, 'Select an order.'),
  status: z.string().min(1, 'Select an order status.'),
});

function AdminManageOrders() {
  // Validate registered order fields before running the existing update action.
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(orderSchema) });

  function handleOrderUpdate() {
    alert('Order status updated! (demo)');
  }

  return (
    <div className="admin-card mx-auto mb-4" style={{ maxWidth: '500px' }}>
      <h3 className="mb-4">Admin: Manage Orders</h3>
      <form noValidate onSubmit={handleSubmit(handleOrderUpdate)}>
        <div className="mb-3">
          <label htmlFor="adminOrderSelect" className="form-label">Select Order</label>
          <select className="form-select" id="adminOrderSelect" {...register('order')}>
            <option value="">Choose an order...</option>
            <option>#101 - Bilal - Margherita Pizza</option>
            <option>#102 - Sara - Cappuccino</option>
            <option>#103 - Ali - Chocolate Shake</option>
          </select>
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
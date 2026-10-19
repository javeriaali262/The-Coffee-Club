import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// Validate required delivery details and ensure quantity is a positive integer.
const orderSchema = z.object({
  name: z.string().trim().min(1, 'Your name is required.'),
  category: z.string().min(1),
  item: z.string().trim().min(1, 'Item name is required.'),
  quantity: z.string().min(1, 'Quantity is required.').refine((value) => Number.isInteger(Number(value)) && Number(value) > 0, 'Quantity must be a whole number greater than 0.'),
  address: z.string().trim().min(1, 'Delivery address is required.'),
  payment: z.string().min(1),
});

function CustomerPlaceOrder() {
  // Register the order fields and expose validation errors from Zod.
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(orderSchema) });

  function handleOrderSubmit() {
    alert('Order placed! (demo)');
  }

  return (
    <div className="admin-card mx-auto mb-4" style={{ maxWidth: '500px' }}>
      <h3 className="mb-4">Customer: Place Order</h3>
      <form onSubmit={handleSubmit(handleOrderSubmit)}>
        {Object.values(errors).map((error, index) => (
          <div className="text-danger" key={`${error.message}-${index}`} role="alert">{error.message}</div>
        ))}
        <div className="mb-3">
          <label htmlFor="customerOrderName" className="form-label">Your Name</label>
          <input type="text" className="form-control" id="customerOrderName" placeholder="Enter your name" required {...register('name')} />
        </div>
        <div className="mb-3">
          <label htmlFor="customerOrderCategory" className="form-label">Category</label>
          <select className="form-select" id="customerOrderCategory" {...register('category')}>
            <option>Choose...</option>
            <option>Pizza</option><option>Seafood</option><option>Chinese</option>
            <option>Italian</option><option>Burgers</option><option>Sandwich</option>
            <option>Desserts</option><option>Ice Cream</option><option>Coffee</option><option>Shakes</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="customerOrderItem" className="form-label">Item Name</label>
          <input type="text" className="form-control" id="customerOrderItem" placeholder="e.g. Margherita Pizza" required {...register('item')} />
        </div>
        <div className="mb-3">
          <label htmlFor="customerOrderQty" className="form-label">Quantity</label>
          <input type="number" min="1" className="form-control" id="customerOrderQty" placeholder="e.g. 2" required {...register('quantity')} />
        </div>
        <div className="mb-3">
          <label htmlFor="customerOrderAddress" className="form-label">Delivery Address</label>
          <input type="text" className="form-control" id="customerOrderAddress" placeholder="House no, street, city" required {...register('address')} />
        </div>
        <div className="mb-3">
          <label htmlFor="customerOrderPayment" className="form-label">Payment Method</label>
          <select className="form-select" id="customerOrderPayment" {...register('payment')}>
            <option>Cash on Delivery</option>
            <option>Card</option>
            <option>Easypaisa / JazzCash</option>
          </select>
        </div>
        <button type="submit" className="btn btn-coffee">Place Order</button>
      </form>
    </div>
  );
}

export default CustomerPlaceOrder;
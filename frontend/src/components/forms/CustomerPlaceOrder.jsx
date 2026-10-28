import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { createOrder, getProduct } from '../../services/api';

// Validate required delivery details and ensure quantity is a positive integer.
const orderSchema = z.object({
  name: z.string().trim().min(1, 'Your name is required.'),
  productId: z.string().min(1, 'Please select a product.'),
  quantity: z.string().min(1, 'Quantity is required.').refine((value) => Number.isInteger(Number(value)) && Number(value) > 0, 'Quantity must be a whole number greater than 0.'),
  address: z.string().trim().min(1, 'Delivery address is required.'),
  payment: z.string().min(1, 'Please select a payment method.'),
});

function CustomerPlaceOrder() {
  const [products, setProducts] = useState([]);
  const [loadError, setLoadError] = useState('');

  useEffect(() => {
    async function loadProducts() {
      try {
        const result = await getProduct();
        setProducts(result.data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoadError(error.response?.data?.message || 'Unable to load products.');
      }
    }

    loadProducts();
  }, []);

  // Register the order fields and expose validation errors from Zod.
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(orderSchema) });

  async function handleOrderSubmit(data) {
    try {
      const result = await createOrder(data);
      alert(`${result.data.message}. Order ID: ${result.data.order.orderId}`);
    } catch (error) {
      console.error('Error placing order:', error);
      alert(error.response?.data?.message || 'Unable to place order.');
    }
  }

  return (
    <div className="admin-card mx-auto mb-4" style={{ maxWidth: '500px' }}>
      <h3 className="mb-4">Customer: Place Order</h3>
      <form noValidate onSubmit={handleSubmit(handleOrderSubmit)}>
        <div className="mb-3">
          <label htmlFor="customerOrderName" className="form-label">Your Name</label>
          <input type="text" className="form-control" id="customerOrderName" placeholder="Enter your name" {...register('name')} />
          {errors.name && <div className="text-danger">{errors.name.message}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="customerOrderProduct" className="form-label">Product</label>
          <select className="form-select" id="customerOrderProduct" {...register('productId')}>
            <option value="">Choose a product...</option>
            {products.map((product) => (
              <option key={product.productId} value={product.productId}>
                {product.productName} - Rs. {product.productPrice} ({product.productStock} available)
              </option>
            ))}
          </select>
          {loadError && <div className="text-danger">{loadError}</div>}
          {errors.productId && <div className="text-danger">{errors.productId.message}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="customerOrderQty" className="form-label">Quantity</label>
          <input type="number" min="1" className="form-control" id="customerOrderQty" placeholder="e.g. 2" {...register('quantity')} />
          {errors.quantity && <div className="text-danger">{errors.quantity.message}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="customerOrderAddress" className="form-label">Delivery Address</label>
          <input type="text" className="form-control" id="customerOrderAddress" placeholder="House no, street, city" {...register('address')} />
          {errors.address && <div className="text-danger">{errors.address.message}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="customerOrderPayment" className="form-label">Payment Method</label>
          <select className="form-select" id="customerOrderPayment" {...register('payment')}>
            <option value="">Choose a payment method...</option>
            <option>Cash on Delivery</option>
            <option>Card</option>
            <option>Easypaisa / JazzCash</option>
          </select>
          {errors.payment && <div className="text-danger">{errors.payment.message}</div>}
        </div>
        <button type="submit" className="btn btn-coffee">Place Order</button>
      </form>
    </div>
  );
}

export default CustomerPlaceOrder;
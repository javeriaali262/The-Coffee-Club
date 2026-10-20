import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// Require a product, price, and quantity before updating.
const updateProductSchema = z.object({
  product: z.string().min(1, 'Select a product.'),
  price: z.string().min(1, 'Price is required.').refine((value) => Number(value) > 0, 'Price must be greater than 0.'),
  quantity: z.string().min(1, 'Quantity is required.').refine((value) => Number.isInteger(Number(value)) && Number(value) >= 0, 'Quantity must be a whole number of 0 or more.'),
});

function AdminUpdateProduct() {
  // Keep the optional fields blank initially and validate submitted values.
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(updateProductSchema),
    defaultValues: { price: '', quantity: '' },
  });

  function handleProductUpdate() {
    alert('Product updated! (demo)');
  }

  return (
    <div className="admin-card mx-auto mb-4" style={{ maxWidth: '500px' }}>
      <h3 className="mb-4">Admin: Update Product</h3>
      <form noValidate onSubmit={handleSubmit(handleProductUpdate)}>
        <div className="mb-3">
          <label htmlFor="adminUpdateSelect" className="form-label">Select Product</label>
          <select className="form-select" id="adminUpdateSelect" {...register('product')}>
            <option value="">Choose a product...</option>
            <option>Margherita Pizza</option><option>Cappuccino</option><option>Chocolate Shake</option>
          </select>
          {errors.product && <div className="text-danger">{errors.product.message}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="adminUpdatePrice" className="form-label">New Price (Rs.)</label>
          <input type="number" className="form-control" id="adminUpdatePrice" placeholder="e.g. 950" {...register('price')} />
          {errors.price && <div className="text-danger">{errors.price.message}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="adminUpdateQuantity" className="form-label">New Quantity</label>
          <input type="number" className="form-control" id="adminUpdateQuantity" placeholder="e.g. 40" {...register('quantity')} />
          {errors.quantity && <div className="text-danger">{errors.quantity.message}</div>}
          <div className="form-text">This will replace the current stock count.</div>
        </div>
        <button type="submit" className="btn btn-coffee me-2">Update Product</button>
        <button type="button" className="btn btn-outline-secondary">Cancel</button>
      </form>
    </div>
  );
}

export default AdminUpdateProduct;
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// Allow price and quantity to stay blank, but validate them when provided.
const updateProductSchema = z.object({
  product: z.string().min(1),
  price: z.string().refine((value) => value === '' || Number(value) > 0, 'Price must be greater than 0.'),
  quantity: z.string().refine((value) => value === '' || (Number.isInteger(Number(value)) && Number(value) >= 0), 'Quantity must be a whole number of 0 or more.'),
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
      <form onSubmit={handleSubmit(handleProductUpdate)}>
        {Object.values(errors).map((error, index) => (
          <div className="text-danger" key={`${error.message}-${index}`} role="alert">{error.message}</div>
        ))}
        <div className="mb-3">
          <label htmlFor="adminUpdateSelect" className="form-label">Select Product</label>
          <select className="form-select" id="adminUpdateSelect" {...register('product')}>
            <option>Margherita Pizza</option><option>Cappuccino</option><option>Chocolate Shake</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="adminUpdatePrice" className="form-label">New Price (Rs.)</label>
          <input type="number" className="form-control" id="adminUpdatePrice" placeholder="e.g. 950" {...register('price')} />
        </div>
        <div className="mb-3">
          <label htmlFor="adminUpdateQuantity" className="form-label">New Quantity</label>
          <input type="number" className="form-control" id="adminUpdateQuantity" placeholder="e.g. 40" {...register('quantity')} />
          <div className="form-text">This will replace the current stock count.</div>
        </div>
        <button type="submit" className="btn btn-coffee me-2">Update Product</button>
        <button type="button" className="btn btn-outline-secondary">Cancel</button>
      </form>
    </div>
  );
}

export default AdminUpdateProduct;
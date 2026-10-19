import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// Require a selected product before allowing the delete action.
const deleteProductSchema = z.object({
  product: z.string().min(1, 'Select a product.'),
});

function AdminDeleteProduct() {
  // Run Zod validation before calling the existing delete action.
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(deleteProductSchema) });

  function handleDeleteProduct() {
    alert('Product deleted! (demo)');
  }

  return (
    <div className="admin-card mx-auto mb-4" style={{ maxWidth: '500px' }}>
      <h3 className="mb-4">Admin: Delete Product</h3>
      <form onSubmit={handleSubmit(handleDeleteProduct)}>
        {Object.values(errors).map((error, index) => (
          <div className="text-danger" key={`${error.message}-${index}`} role="alert">{error.message}</div>
        ))}
        <div className="mb-3">
          <label htmlFor="adminDeleteSelect" className="form-label">Select Product</label>
          <select className="form-select" id="adminDeleteSelect" aria-describedby="adminDeleteHelp" {...register('product')}>
            <option>Margherita Pizza</option>
            <option>Cappuccino</option>
            <option>Chocolate Shake</option>
          </select>
          <div id="adminDeleteHelp" className="form-text">Choose the product you want to remove from the menu.</div>
        </div>
        <div className="delete-warning">⚠️ This action cannot be undone!</div>
        <button type="submit" className="btn btn-danger">Delete Product</button>
      </form>
    </div>
  );
}

export default AdminDeleteProduct;
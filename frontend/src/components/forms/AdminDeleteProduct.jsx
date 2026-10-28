import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { adminDeleteProductAxiosFunction, getProduct } from '../../services/api';

// Require a selected product before allowing the delete action.
const deleteProductSchema = z.object({
  productId: z.string().min(1, 'Select a product.'),
});

function AdminDeleteProduct() {
  const [products, setProducts] = useState([]);
  const [loadError, setLoadError] = useState('');

  useEffect(() => {
    async function loadProducts() {
      try {
        const result = await getProduct();
        const returnedProductData = result.data;
        setProducts(returnedProductData);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoadError(error.response?.data?.message || 'Unable to load products. Check that the backend and database are running.');
      }
    }

    loadProducts();
  }, []);

  // Run Zod validation before calling the existing delete action.
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(deleteProductSchema) });

  async function handleDeleteProduct(data) {
    try {
      const result = await adminDeleteProductAxiosFunction(data.productId);
      setProducts((currentProducts) =>
        currentProducts.filter((product) => product.productId !== data.productId)
      );
      alert(result.data.message);
      reset();
    } catch (error) {
      console.error('Error deleting product:', error);
      alert(error.response?.data?.message || 'Unable to delete product.');
    }
  }

  return (
    <div className="admin-card mx-auto mb-4" style={{ maxWidth: '500px' }}>
      <h3 className="mb-4">Admin: Delete Product</h3>
      <form noValidate onSubmit={handleSubmit(handleDeleteProduct)}>
        <div className="mb-3">
          <label htmlFor="adminDeleteSelect" className="form-label">Select Product</label>
          <select className="form-select" id="adminDeleteSelect" aria-describedby="adminDeleteHelp" {...register('productId')}>
            <option value="">Choose a product...</option>
            {products.map((product) => (
              <option key={product.productId} value={product.productId}>{product.productName}</option>
            ))}
          </select>
          {loadError && <div className="text-danger">{loadError}</div>}
          {errors.productId && <div className="text-danger">{errors.productId.message}</div>}
          <div id="adminDeleteHelp" className="form-text">Choose the product you want to remove from the menu.</div>
        </div>
        <div className="delete-warning">⚠️ This action cannot be undone!</div>
        <button type="submit" className="btn btn-danger">Delete Product</button>
      </form>
    </div>
  );
}

export default AdminDeleteProduct;
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { adminUpdateProductAxiosFunction, getProduct } from '../../services/api';

// Require a product, price, and quantity before updating.
const updateProductSchema = z.object({
  productId: z.string().min(1, 'Select a product.'),
  price: z.string().min(1, 'Price is required.').refine((value) => Number(value) > 0, 'Price must be greater than 0.'),
  quantity: z.string().min(1, 'Quantity is required.').refine((value) => Number.isInteger(Number(value)) && Number(value) >= 0, 'Quantity must be a whole number of 0 or more.'),
});

function AdminUpdateProduct() {
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

  // Keep the optional fields blank initially and validate submitted values.
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(updateProductSchema),
    defaultValues: { price: '', quantity: '' },
  });

  async function handleProductUpdate(data) {
    try {
      const result = await adminUpdateProductAxiosFunction({
        productId: data.productId,
        productPrice: Number(data.price),
        productStock: Number(data.quantity),
      });
      setProducts((currentProducts) =>
        currentProducts.map((product) =>
          product.productId === result.data.product.productId ? result.data.product : product
        )
      );
      alert(result.data.message);
      reset();
    } catch (error) {
      console.error('Error updating product:', error);
      alert(error.response?.data?.message || 'Unable to update product.');
    }
  }

  return (
    <div className="admin-card mx-auto mb-4" style={{ maxWidth: '500px' }}>
      <h3 className="mb-4">Admin: Update Product</h3>
      <form noValidate onSubmit={handleSubmit(handleProductUpdate)}>
        <div className="mb-3">
          <label htmlFor="adminUpdateSelect" className="form-label">Select Product</label>
          <select className="form-select" id="adminUpdateSelect" {...register('productId')}>
            <option value="">Choose a product...</option>
            {products.map((product) => (
              <option key={product.productId} value={product.productId}>{product.productName}</option>
            ))}
          </select>
          {loadError && <div className="text-danger">{loadError}</div>}
          {errors.productId && <div className="text-danger">{errors.productId.message}</div>}
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
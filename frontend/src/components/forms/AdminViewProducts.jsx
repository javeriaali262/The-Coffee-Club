import { useEffect, useState } from 'react';
import { getProduct } from '../../services/api';

function AdminViewProducts() {
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

  return (
    <div className="admin-card mx-auto mb-4">
      <h3 className="mb-4">Admin: View Products</h3>
      {loadError ? (
        <div className="text-danger">{loadError}</div>
      ) : products.length === 0 ? (
        <p className="mb-0">No products found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table align-middle mb-0">
            <thead>
              <tr>
                <th scope="col">Product</th>
                <th scope="col">Category</th>
                <th scope="col">Price (Rs.)</th>
                <th scope="col">Stock</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.productId}>
                  <td>{product.productName}</td>
                  <td>{product.productCategory}</td>
                  <td>{product.productPrice}</td>
                  <td>{product.productStock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminViewProducts;

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { z } from 'zod';
import { adminAddProductAxiosFunction } from '../../services/api';

// Zod checks required product details and keeps stock and price values valid.
const productSchema = z.object({
  productName: z.string().trim().min(2, 'Product name must be at least 2 characters.'),
  productPrice: z.string().min(1, 'Price is required.').refine((value) => Number(value) > 0, 'Price must be greater than 0.'),
  productStock: z.string().min(1, 'Stock quantity is required.').refine((value) => Number.isInteger(Number(value)) && Number(value) >= 0, 'Stock must be a whole number of 0 or more.'),
  productCategory: z.string().min(1, 'Category is required.'),
  productImage: z.any().refine((files) => files?.length > 0, 'Product image is required.'),
});

function AdminAddProduct() {
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  // Connect the inputs to the schema and expose any validation messages.
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(productSchema) });
//this is the function that handles the form submission and sends the data to the backend using the adminAddProductAxiosFunction. It also handles success and error messages.
  async function handleProductSubmit(data) {
    const formData = new FormData();
    formData.append('productName', data.productName);
    formData.append('productPrice', data.productPrice);
    formData.append('productStock', data.productStock);
    formData.append('productCategory', data.productCategory);
    formData.append('productImage', data.productImage[0]);
//error handling is done using a try-catch block. If the request is successful, a success message is displayed and the form is reset. If there is an error, an error message is displayed.
    try {
      //if the request is successful, a success message is displayed and the form is reset. If there is an error, an error message is displayed.
      await adminAddProductAxiosFunction(formData);
      setErrorMessage('');
      setMessage('Product added successfully.');
      reset();
    } 
   //catch block is used to catch any errors that occur during the request. The error message is displayed to the user. 
    catch (error) {
      console.error('Error adding product:', error);
      setMessage('');
      setErrorMessage(error.response?.data?.message || error.response?.data || 'Unable to add product.');
    }
  }

  return (
    <div className="admin-card mx-auto mb-4" style={{ maxWidth: '500px' }}>
      <h3 className="mb-4">Admin: Add Product</h3>
      <form noValidate onSubmit={handleSubmit(handleProductSubmit)}>
        <div className="mb-3">
          <label htmlFor="adminProductName" className="form-label">Product Name</label>
          <input type="text" className="form-control" id="adminProductName" placeholder="e.g. Cappuccino" {...register('productName')} />
          <div className="form-text">This will be shown on the menu exactly as typed.</div>
          {/* Show field-specific messages when product validation fails. */}
          {errors.productName && <div className="text-danger">{errors.productName.message}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="adminProductPrice" className="form-label">Price (Rs.)</label>
          <input type="number" className="form-control" id="adminProductPrice" placeholder="e.g. 300" {...register('productPrice')} />
          {errors.productPrice && <div className="text-danger">{errors.productPrice.message}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="adminProductStock" className="form-label">Stock Quantity</label>
          <input type="number" className="form-control" id="adminProductStock" placeholder="e.g. 50" {...register('productStock')} />
          {errors.productStock && <div className="text-danger">{errors.productStock.message}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="adminProductCategory" className="form-label">Category</label>
          <select className="form-select" id="adminProductCategory" {...register('productCategory')}>
            <option value="">Choose...</option>
            <option>Pizza</option><option>Seafood</option><option>Chinese</option>
            <option>Italian</option><option>Burgers</option><option>Sandwich</option>
            <option>Desserts</option><option>Ice Cream</option><option>Coffee</option><option>Shakes</option>
          </select>
          {errors.productCategory && <div className="text-danger">{errors.productCategory.message}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="adminProductImage" className="form-label">Product Image</label>
          <input type="file" className="form-control" id="adminProductImage" {...register('productImage')} />
          {errors.productImage && <div className="text-danger">{errors.productImage.message}</div>}
        </div>
        {message && <div className="text-success mb-3">{message}</div>}
        {errorMessage && <div className="text-danger mb-3">{errorMessage}</div>}
        <button type="submit" className="btn btn-coffee">Add Product</button>
      </form>
    </div>
  );
}

export default AdminAddProduct;
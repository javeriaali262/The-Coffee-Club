function AddProduct() {
  return (
    <div className="admin-card">
      <h3 className="mb-4">Add Product</h3>
      <form onSubmit={(e) => { e.preventDefault(); alert("Product added! (demo)"); }}>
        <div className="mb-3">
          <label htmlFor="productName" className="form-label">Product Name</label>
          <input type="text" className="form-control" id="productName" required />
          <div className="form-text">This will be shown on the menu exactly as typed.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="productPrice" className="form-label">Price (Rs.)</label>
          <input type="number" className="form-control" id="productPrice" required />
        </div>
        <div className="mb-3">
          <label htmlFor="productStock" className="form-label">Stock Quantity</label>
          <input type="number" className="form-control" id="productStock" required />
          <div className="form-text">How many units are currently available.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="productCategory" className="form-label">Category</label>
          <select className="form-select" id="productCategory">
            <option>Choose...</option>
            <option>Pizza</option><option>Seafood</option><option>Chinese</option>
            <option>Italian</option><option>Burgers</option><option>Coffee</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="productImage" className="form-label">Product Image</label>
          <input type="file" className="form-control" id="productImage" />
        </div>
        <button type="submit" className="btn btn-coffee">Add Product</button>
      </form>
    </div>
  );
}

export default AddProduct;
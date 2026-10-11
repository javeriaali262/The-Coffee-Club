function AdminAddProduct() {
  return (
    <div className="admin-card mx-auto mb-4" style={{ maxWidth: '500px' }}>
      <h3 className="mb-4">Admin: Add Product</h3>
      <form onSubmit={(e) => { e.preventDefault(); alert("Product added! (demo)"); }}>
        <div className="mb-3">
          <label htmlFor="adminProductName" className="form-label">Product Name</label>
          <input type="text" className="form-control" id="adminProductName" placeholder="e.g. Cappuccino" required />
          <div className="form-text">This will be shown on the menu exactly as typed.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="adminProductPrice" className="form-label">Price (Rs.)</label>
          <input type="number" className="form-control" id="adminProductPrice" placeholder="e.g. 300" required />
        </div>
        <div className="mb-3">
          <label htmlFor="adminProductStock" className="form-label">Stock Quantity</label>
          <input type="number" className="form-control" id="adminProductStock" placeholder="e.g. 50" required />
        </div>
        <div className="mb-3">
          <label htmlFor="adminProductCategory" className="form-label">Category</label>
          <select className="form-select" id="adminProductCategory">
            <option>Choose...</option>
            <option>Pizza</option><option>Seafood</option><option>Chinese</option>
            <option>Italian</option><option>Burgers</option><option>Coffee</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="adminProductImage" className="form-label">Product Image</label>
          <input type="file" className="form-control" id="adminProductImage" />
        </div>
        <button type="submit" className="btn btn-coffee">Add Product</button>
      </form>
    </div>
  );
}

export default AdminAddProduct;
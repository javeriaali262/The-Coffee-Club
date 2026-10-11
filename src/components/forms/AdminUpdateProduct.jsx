function AdminUpdateProduct() {
  return (
    <div className="admin-card mx-auto mb-4" style={{ maxWidth: '500px' }}>
      <h3 className="mb-4">Admin: Update Product</h3>
      <form onSubmit={(e) => { e.preventDefault(); alert("Product updated! (demo)"); }}>
        <div className="mb-3">
          <label htmlFor="adminUpdateSelect" className="form-label">Select Product</label>
          <select className="form-select" id="adminUpdateSelect">
            <option>Margherita Pizza</option><option>Cappuccino</option><option>Chocolate Shake</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="adminUpdatePrice" className="form-label">New Price (Rs.)</label>
          <input type="number" className="form-control" id="adminUpdatePrice" placeholder="e.g. 950" />
        </div>
        <div className="mb-3">
          <label htmlFor="adminUpdateQuantity" className="form-label">New Quantity</label>
          <input type="number" className="form-control" id="adminUpdateQuantity" placeholder="e.g. 40" />
          <div className="form-text">This will replace the current stock count.</div>
        </div>
        <button type="submit" className="btn btn-coffee me-2">Update Product</button>
        <button type="button" className="btn btn-outline-secondary">Cancel</button>
      </form>
    </div>
  );
}

export default AdminUpdateProduct;
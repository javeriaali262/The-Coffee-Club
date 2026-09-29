function UpdateProduct() {
  return (
    <div className="admin-card">
      <h3 className="mb-4">Update Product</h3>
      <form onSubmit={(e) => { e.preventDefault(); alert("Product updated! (demo)"); }}>
        <div className="mb-3">
          <label htmlFor="selectProduct" className="form-label">Select Product</label>
          <select className="form-select" id="selectProduct">
            <option>Margherita Pizza</option><option>Cappuccino</option><option>Chocolate Shake</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="newPrice" className="form-label">New Price (Rs.)</label>
          <input type="number" className="form-control" id="newPrice" placeholder="e.g. 950" />
        </div>
        <div className="mb-3">
          <label htmlFor="newQuantity" className="form-label">New Quantity</label>
          <input type="number" className="form-control" id="newQuantity" placeholder="e.g. 40" />
          <div className="form-text">This will replace the current stock count.</div>
        </div>
        <button type="submit" className="btn btn-coffee me-2">Update Product</button>
        <button type="button" className="btn btn-outline-secondary">Cancel</button>
      </form>
    </div>
  );
}

export default UpdateProduct;
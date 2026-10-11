function AdminDeleteProduct() {
  return (
    <div className="admin-card mx-auto mb-4" style={{ maxWidth: '500px' }}>
      <h3 className="mb-4">Admin: Delete Product</h3>
      <form onSubmit={(e) => { e.preventDefault(); alert("Product deleted! (demo)"); }}>
        <div className="mb-3">
          <label htmlFor="adminDeleteSelect" className="form-label">Select Product</label>
          <select className="form-select" id="adminDeleteSelect" aria-describedby="adminDeleteHelp">
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
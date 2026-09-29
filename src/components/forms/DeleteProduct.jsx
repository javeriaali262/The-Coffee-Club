function DeleteProduct() {
  return (
    <div className="admin-card">
      <h3 className="mb-4">Delete Product</h3>
      <form onSubmit={(e) => { e.preventDefault(); alert("Product discontinued! (demo)"); }}>
        <div className="mb-3">
          <label htmlFor="deleteProductSelect" className="form-label">Select Product</label>
          <select className="form-select" id="deleteProductSelect" aria-describedby="deleteHelp">
            <option>Margherita Pizza</option>
            <option>Cappuccino</option>
            <option>Chocolate Shake</option>
          </select>
          <div id="deleteHelp" className="form-text">Choose the product you want to discontinue from the menu.</div>
        </div>
        <div className="delete-warning">⚠️ This action cannot be undone!</div>
        <button type="submit" className="btn btn-danger">Delete Product</button>
      </form>
    </div>
  );
}

export default DeleteProduct;
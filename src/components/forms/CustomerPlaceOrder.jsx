function CustomerPlaceOrder() {
  return (
    <div className="admin-card mx-auto mb-4" style={{ maxWidth: '500px' }}>
      <h3 className="mb-4">Customer: Place Order</h3>
      <form onSubmit={(e) => { e.preventDefault(); alert("Order placed! (demo)"); }}>
        <div className="mb-3">
          <label htmlFor="customerOrderName" className="form-label">Your Name</label>
          <input type="text" className="form-control" id="customerOrderName" placeholder="Enter your name" required />
        </div>
        <div className="mb-3">
          <label htmlFor="customerOrderCategory" className="form-label">Category</label>
          <select className="form-select" id="customerOrderCategory">
            <option>Choose...</option>
            <option>Pizza</option><option>Seafood</option><option>Chinese</option>
            <option>Italian</option><option>Burgers</option><option>Sandwich</option>
            <option>Desserts</option><option>Ice Cream</option><option>Coffee</option><option>Shakes</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="customerOrderItem" className="form-label">Item Name</label>
          <input type="text" className="form-control" id="customerOrderItem" placeholder="e.g. Margherita Pizza" required />
        </div>
        <div className="mb-3">
          <label htmlFor="customerOrderQty" className="form-label">Quantity</label>
          <input type="number" min="1" className="form-control" id="customerOrderQty" placeholder="e.g. 2" required />
        </div>
        <div className="mb-3">
          <label htmlFor="customerOrderAddress" className="form-label">Delivery Address</label>
          <input type="text" className="form-control" id="customerOrderAddress" placeholder="House no, street, city" required />
        </div>
        <div className="mb-3">
          <label htmlFor="customerOrderPayment" className="form-label">Payment Method</label>
          <select className="form-select" id="customerOrderPayment">
            <option>Cash on Delivery</option>
            <option>Card</option>
            <option>Easypaisa / JazzCash</option>
          </select>
        </div>
        <button type="submit" className="btn btn-coffee">Place Order</button>
      </form>
    </div>
  );
}

export default CustomerPlaceOrder;
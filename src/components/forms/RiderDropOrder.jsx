function RiderDropOrder() {
  return (
    <div className="admin-card mx-auto mb-4" style={{ maxWidth: '500px' }}>
      <h3 className="mb-4">Rider: Drop Order</h3>
      <form onSubmit={(e) => { e.preventDefault(); alert("Order delivered! (demo)"); }}>
        <div className="mb-3">
          <label htmlFor="riderDropOrder" className="form-label">Select Order</label>
          <select className="form-select" id="riderDropOrder">
            <option>#101 - Bilal - Margherita Pizza</option>
            <option>#102 - Sara - Cappuccino</option>
            <option>#103 - Ali - Chocolate Shake</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="riderDropName" className="form-label">Customer Name</label>
          <input type="text" className="form-control" id="riderDropName" placeholder="Enter customer name" required />
        </div>
        <div className="mb-3">
          <label htmlFor="riderDropAddress" className="form-label">Drop Address</label>
          <input type="text" className="form-control" id="riderDropAddress" placeholder="House no, street, city" required />
        </div>
        <div className="mb-3">
          <label htmlFor="riderDropTime" className="form-label">Drop Time</label>
          <input type="time" className="form-control" id="riderDropTime" required />
        </div>
        <div className="mb-3">
          <label htmlFor="riderDropPayment" className="form-label">Payment Collected (Rs.)</label>
          <input type="number" className="form-control" id="riderDropPayment" placeholder="e.g. 900" />
          <div className="form-text">Leave empty if the customer already paid online.</div>
        </div>
        <button type="submit" className="btn btn-coffee">Confirm Drop</button>
      </form>
    </div>
  );
}

export default RiderDropOrder;
function AdminManageOrders() {
  return (
    <div className="admin-card mx-auto mb-4" style={{ maxWidth: '500px' }}>
      <h3 className="mb-4">Admin: Manage Orders</h3>
      <form onSubmit={(e) => { e.preventDefault(); alert("Order status updated! (demo)"); }}>
        <div className="mb-3">
          <label htmlFor="adminOrderSelect" className="form-label">Select Order</label>
          <select className="form-select" id="adminOrderSelect">
            <option>#101 - Bilal - Margherita Pizza</option>
            <option>#102 - Sara - Cappuccino</option>
            <option>#103 - Ali - Chocolate Shake</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="adminOrderStatus" className="form-label">Order Status</label>
          <select className="form-select" id="adminOrderStatus">
            <option>Pending</option>
            <option>Preparing</option>
            <option>Ready for Delivery</option>
            <option>Delivered</option>
            <option>Cancelled</option>
          </select>
        </div>
        <button type="submit" className="btn btn-coffee">Update Status</button>
      </form>
    </div>
  );
}

export default AdminManageOrders;
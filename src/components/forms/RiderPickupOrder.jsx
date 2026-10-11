function RiderPickupOrder() {
  return (
    <div className="admin-card mx-auto mb-4" style={{ maxWidth: '500px' }}>
      <h3 className="mb-4">Rider: Pickup Order</h3>
      <form onSubmit={(e) => { e.preventDefault(); alert("Order picked up! (demo)"); }}>
        <div className="mb-3">
          <label htmlFor="riderPickupOrder" className="form-label">Select Order</label>
          <select className="form-select" id="riderPickupOrder">
            <option>#101 - Bilal - Margherita Pizza</option>
            <option>#102 - Sara - Cappuccino</option>
            <option>#103 - Ali - Chocolate Shake</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="riderPickupLocation" className="form-label">Pickup Location</label>
          <input type="text" className="form-control" id="riderPickupLocation" defaultValue="The Coffee Club" />
        </div>
        <div className="mb-3">
          <label htmlFor="riderPickupTime" className="form-label">Pickup Time</label>
          <input type="time" className="form-control" id="riderPickupTime" required />
        </div>
        <div className="mb-3">
          <label htmlFor="riderPickupNote" className="form-label">Note</label>
          <textarea className="form-control" id="riderPickupNote" rows="3" placeholder="e.g. Order packed properly, 2 items"></textarea>
        </div>
        <button type="submit" className="btn btn-coffee">Confirm Pickup</button>
      </form>
    </div>
  );
}

export default RiderPickupOrder;
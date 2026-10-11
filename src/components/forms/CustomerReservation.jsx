function CustomerReservation() {
  return (
    <div className="admin-card mx-auto mb-4" style={{ maxWidth: '500px' }}>
      <h3 className="mb-4">Customer: Table Reservation</h3>
      <form onSubmit={(e) => { e.preventDefault(); alert("Table booked! (demo)"); }}>
        <div className="mb-3">
          <label htmlFor="customerResName" className="form-label">Name</label>
          <input type="text" className="form-control" id="customerResName" placeholder="Enter your name" required />
        </div>
        <div className="mb-3">
          <label htmlFor="customerResPhone" className="form-label">Phone Number</label>
          <input type="tel" className="form-control" id="customerResPhone" placeholder="03XX XXXXXXX" required />
        </div>
        <div className="mb-3">
          <label htmlFor="customerResDate" className="form-label">Date</label>
          <input type="date" className="form-control" id="customerResDate" required />
        </div>
        <div className="mb-3">
          <label htmlFor="customerResTime" className="form-label">Time</label>
          <input type="time" className="form-control" id="customerResTime" required />
        </div>
        <div className="mb-3">
          <label htmlFor="customerResGuests" className="form-label">Number of Guests</label>
          <input type="number" min="1" className="form-control" id="customerResGuests" placeholder="e.g. 4" required />
        </div>
        <div className="mb-3">
          <label htmlFor="customerResNote" className="form-label">Special Request</label>
          <textarea className="form-control" id="customerResNote" rows="3" placeholder="e.g. Window seat, birthday setup"></textarea>
        </div>
        <button type="submit" className="btn btn-coffee">Book Table</button>
      </form>
    </div>
  );
}

export default CustomerReservation;
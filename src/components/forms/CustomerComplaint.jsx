function CustomerComplaint() {
  return (
    <div className="admin-card mx-auto mb-4" style={{ maxWidth: '500px' }}>
      <h3 className="mb-4">Customer: Complaint</h3>
      <form onSubmit={(e) => { e.preventDefault(); alert("Complaint submitted! (demo)"); }}>
        <div className="mb-3">
          <label htmlFor="customerComplaintName" className="form-label">Your Name</label>
          <input type="text" className="form-control" id="customerComplaintName" placeholder="Enter your name" required />
        </div>
        <div className="mb-3">
          <label htmlFor="customerComplaintOrder" className="form-label">Order Number</label>
          <input type="text" className="form-control" id="customerComplaintOrder" placeholder="e.g. #101" required />
        </div>
        <div className="mb-3">
          <label htmlFor="customerComplaintType" className="form-label">Complaint Type</label>
          <select className="form-select" id="customerComplaintType">
            <option>Order was late</option>
            <option>Food was cold</option>
            <option>Wrong item received</option>
            <option>Bad service</option>
            <option>Other</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="customerComplaintDetails" className="form-label">Details</label>
          <textarea className="form-control" id="customerComplaintDetails" rows="3" placeholder="Write what happened" required></textarea>
        </div>
        <button type="submit" className="btn btn-coffee">Submit Complaint</button>
      </form>
    </div>
  );
}

export default CustomerComplaint;
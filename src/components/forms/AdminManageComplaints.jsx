function AdminManageComplaints() {
  return (
    <div className="admin-card mx-auto mb-4" style={{ maxWidth: '500px' }}>
      <h3 className="mb-4">Admin: Manage Complaints</h3>
      <form onSubmit={(e) => { e.preventDefault(); alert("Complaint updated! (demo)"); }}>
        <div className="mb-3">
          <label htmlFor="adminComplaintSelect" className="form-label">Select Complaint</label>
          <select className="form-select" id="adminComplaintSelect">
            <option>Bilal Ahmed — Order kaafi late aaya</option>
            <option>Sara Khan — Pizza thanda mila</option>
          </select>
          <div className="form-text">Choose the complaint you want to act on.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="adminComplaintAction" className="form-label">Action</label>
          <select className="form-select" id="adminComplaintAction">
            <option>Process / Update</option>
            <option>Resolve / Delete</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="adminComplaintReply" className="form-label">Reply to Customer</label>
          <textarea className="form-control" id="adminComplaintReply" rows="3" placeholder="Write your reply"></textarea>
        </div>
        <button type="submit" className="btn btn-coffee">Submit</button>
      </form>
    </div>
  );
}

export default AdminManageComplaints;
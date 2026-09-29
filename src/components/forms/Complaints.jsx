function Complaints() {
  const complaints = [
    "Bilal Ahmed — Order kaafi late aaya",
    "Sara Khan — Pizza thanda mila",
  ];

  function handleSubmit(e) {
    e.preventDefault();
    alert("Complaint update ho gayi! (demo)");
  }

  return (
    <div className="admin-card">
      <h3 className="mb-4">Complaints</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="complaintSelect" className="form-label">Select Complaint</label>
          <select className="form-select" id="complaintSelect">
            {complaints.map((label) => (
              <option key={label}>{label}</option>
            ))}
          </select>
          <div className="form-text">Choose the complaint you want to act on.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="complaintAction" className="form-label">Action</label>
          <select className="form-select" id="complaintAction">
            <option>Process / Update</option>
            <option>Resolve / Delete</option>
          </select>
        </div>
        <button type="submit" className="btn btn-coffee">Submit</button>
      </form>
    </div>
  );
}

export default Complaints;
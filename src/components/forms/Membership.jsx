import { useState } from 'react';

function Membership() {
  const [mode, setMode] = useState("add");

  return (
    <div className="admin-card">
      <h3 className="mb-4">Membership</h3>
      <div className="btn-group mb-4">
        <button className={`btn ${mode === "add" ? "btn-coffee" : "btn-outline-secondary"}`} onClick={() => setMode("add")}>Add Members</button>
        <button className={`btn ${mode === "update" ? "btn-coffee" : "btn-outline-secondary"}`} onClick={() => setMode("update")}>Update Data</button>
      </div>

      {mode === "add" ? (
        <form onSubmit={(e) => { e.preventDefault(); alert("Member added! (demo)"); }}>
          <div className="mb-3">
            <label htmlFor="memberName" className="form-label">Full Name</label>
            <input type="text" className="form-control" id="memberName" required />
          </div>
          <div className="mb-3">
            <label htmlFor="memberEmail" className="form-label">Email</label>
            <input type="email" className="form-control" id="memberEmail" aria-describedby="memberEmailHelp" required />
            <div id="memberEmailHelp" className="form-text">We'll never share this email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="memberContact" className="form-label">Contact Number</label>
            <input type="tel" className="form-control" id="memberContact" />
          </div>
          <button type="submit" className="btn btn-coffee">Add Member</button>
        </form>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); alert("Member data updated! (demo)"); }}>
          <div className="mb-3">
            <label htmlFor="selectMember" className="form-label">Select Member</label>
            <select className="form-select" id="selectMember">
              <option>Ali Khan</option><option>Sara Ahmed</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="memberNewContact" className="form-label">New Contact Number</label>
            <input type="tel" className="form-control" id="memberNewContact" />
          </div>
          <div className="mb-3">
            <label htmlFor="memberNewAddress" className="form-label">New Address</label>
            <input type="text" className="form-control" id="memberNewAddress" />
          </div>
          <button type="submit" className="btn btn-coffee">Update Data</button>
        </form>
      )}
    </div>
  );
}

export default Membership;
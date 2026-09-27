import { useState } from 'react';
import '../App.css';

// Aapke notes ke hisaab se sections
const sections = [
  "View Product",
  "Add Product",
  "Update Product",
  "Delete Product",
  "Complaints",
  "Membership",
  "My Profile",
];

function AdminDashboard({ onLogout }) {
  const [activeSection, setActiveSection] = useState(sections[0]);

  function handleLogout() {
    onLogout();
  }

  return (
    <div className="page-wrapper">
      <div className="admin-layout">
        {/* TOP NAVBAR — URL kabhi nahi badalta, sirf activeSection state badalti hai */}
        <nav className="navbar navbar-dark bg-dark px-4 admin-topbar">
          <span className="navbar-brand fw-bold mb-0">☕ The Coffee Club — Admin</span>

          <div className="admin-nav-links">
            {sections.map((section) => (
              <button
                key={section}
                className={`admin-nav-link-btn ${activeSection === section ? 'active' : ''}`}
                onClick={() => setActiveSection(section)}
              >
                {section}
              </button>
            ))}
          </div>

          <div className="d-flex align-items-center">
            <span className="text-light me-3">Welcome, Admin</span>
            <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>Log Out</button>
          </div>
        </nav>

        <main className="admin-content">
          {renderSection(activeSection)}
        </main>
      </div>
      <footer className="bg-dark text-light text-center py-4">
        <p className="mb-1">&copy; 2026 The Coffee Club. All rights reserved.</p>
        <p className="mb-0 small">Breakfast • Lunch • Dinner</p>
      </footer>
    </div>
  );
}

function renderSection(section) {
  switch (section) {
    case "View Product":
      return <ViewProduct />;
    case "Add Product":
      return <AddProduct />;
    case "Update Product":
      return <UpdateProduct />;
    case "Delete Product":
      return <DeleteProduct />;
    case "Complaints":
      return <Complaints />;
    case "Membership":
      return <Membership />;
    case "My Profile":
      return <MyProfile />;
    default:
      return null;
  }
}

/* ================= VIEW PRODUCT (CRUD: Read) ================= */
function ViewProduct() {
  const products = [
    { name: "Margherita Pizza", category: "Pizza", price: 900, stock: 25 },
    { name: "Cappuccino", category: "Coffee", price: 300, stock: 50 },
    { name: "Chocolate Shake", category: "Shakes", price: 380, stock: 30 },
  ];

  return (
    <div className="admin-card">
      <h3 className="mb-4">View Product</h3>
      <p className="text-muted mb-3">Available products:</p>

      <ul className="list-group">
        {products.map((p) => (
          <li key={p.name} className="list-group-item">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <strong>{p.name}</strong>
                <div className="text-muted small">{p.category}</div>
              </div>
              <div className="text-end">
                <div>Rs. {p.price}</div>
                <div className="text-muted small">{p.stock} in stock</div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ================= ADD PRODUCT (CRUD: Create) ================= */
function AddProduct() {
  return (
    <div className="admin-card">
      <h3 className="mb-4">Add Product</h3>
      <form onSubmit={(e) => { e.preventDefault(); alert("Product added! (demo)"); }}>
        <div className="mb-3">
          <label htmlFor="productName" className="form-label">Product Name</label>
          <input type="text" className="form-control" id="productName" required />
          <div className="form-text">This will be shown on the menu exactly as typed.</div>
        </div>

        <div className="mb-3">
          <label htmlFor="productPrice" className="form-label">Price (Rs.)</label>
          <input type="number" className="form-control" id="productPrice" required />
        </div>

        <div className="mb-3">
          <label htmlFor="productStock" className="form-label">Stock Quantity</label>
          <input type="number" className="form-control" id="productStock" required />
          <div className="form-text">How many units are currently available.</div>
        </div>

        <div className="mb-3">
          <label htmlFor="productCategory" className="form-label">Category</label>
          <select className="form-select" id="productCategory">
            <option>Choose...</option>
            <option>Pizza</option><option>Seafood</option><option>Chinese</option>
            <option>Italian</option><option>Burgers</option><option>Coffee</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="productImage" className="form-label">Product Image</label>
          {/* Yahan apni product ki image select karni hai */}
          <input type="file" className="form-control" id="productImage" />
        </div>

        <button type="submit" className="btn btn-coffee">Add Product</button>
      </form>
    </div>
  );
}

/* ================= UPDATE PRODUCT (CRUD: Update — Price, Quantity) ================= */
function UpdateProduct() {
  return (
    <div className="admin-card">
      <h3 className="mb-4">Update Product</h3>
      <form onSubmit={(e) => { e.preventDefault(); alert("Product updated! (demo)"); }}>
        <div className="mb-3">
          <label htmlFor="selectProduct" className="form-label">Select Product</label>
          <select className="form-select" id="selectProduct">
            <option>Margherita Pizza</option><option>Cappuccino</option><option>Chocolate Shake</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="newPrice" className="form-label">New Price (Rs.)</label>
          <input type="number" className="form-control" id="newPrice" placeholder="e.g. 950" />
        </div>

        <div className="mb-3">
          <label htmlFor="newQuantity" className="form-label">New Quantity</label>
          <input type="number" className="form-control" id="newQuantity" placeholder="e.g. 40" />
          <div className="form-text">This will replace the current stock count.</div>
        </div>

        <button type="submit" className="btn btn-coffee me-2">Update Product</button>
        <button type="button" className="btn btn-outline-secondary">Cancel</button>
      </form>
    </div>
  );
}

/* ================= DELETE PRODUCT (CRUD: Delete — Discontinue) ================= */
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

/* ================= COMPLAINTS (View, Process→Update, Resolve/Delete) ================= */
function Complaints() {
  const complaints = {
    "Bilal Ahmed — Order kaafi late aaya": "Bilal Ahmed",
    "Sara Khan — Pizza thanda mila": "Sara Khan",
  };

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
            {Object.keys(complaints).map((label) => (
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

/* ================= MEMBERSHIP (Add Members, Update Data) ================= */
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

/* ================= MY PROFILE (Update your data here) ================= */
function MyProfile() {
  function handleSubmit(e) {
    e.preventDefault();
    alert("Profile updated! (demo)");
  }

  return (
    <div className="admin-card">
      <h3 className="mb-4">My Profile</h3>
      <p className="text-muted mb-4">Update your personal information here.</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="profileName" className="form-label">Full Name</label>
          <input type="text" className="form-control" id="profileName" defaultValue="Admin" required />
        </div>

        <div className="mb-3">
          <label htmlFor="profileEmail" className="form-label">Email</label>
          <input type="email" className="form-control" id="profileEmail" aria-describedby="profileEmailHelp" defaultValue="admin@coffeeclub.com" required />
          <div id="profileEmailHelp" className="form-text">This Email will be used for login.</div>
        </div>

        <div className="mb-3">
          <label htmlFor="profileNewPassword" className="form-label">New Password</label>
          <input type="password" className="form-control" id="profileNewPassword" placeholder="" />
        </div>

        <div className="mb-3">
          <label htmlFor="profileConfirmPassword" className="form-label">Confirm New Password</label>
          <input type="password" className="form-control" id="profileConfirmPassword" />
        </div>

        <button type="submit" className="btn btn-coffee">Save Changes</button>
      </form>
    </div>
  );
}

export default AdminDashboard;
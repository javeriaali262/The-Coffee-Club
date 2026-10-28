import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import '../App.css';

const roleForms = {
  customer: {
    title: 'Customer',
    links: [
      { label: 'Login', path: '/customer/login' },
      { label: 'Create Account', path: '/customer/signup' },
      { label: 'Make a Reservation', path: '/customer/reservation' },
      { label: 'Place an Order', path: '/customer/place-order' },
      { label: 'Send Feedback', path: '/customer/feedback' },
      { label: 'Submit a Complaint', path: '/customer/complaint' },
    ],
  },
  rider: {
    title: 'Rider',
    links: [
      { label: 'Pick Up an Order', path: '/rider/pickup-order' },
      { label: 'Drop Off an Order', path: '/rider/drop-order' },
    ],
  },
};

const adminGroups = [
  {
    label: 'Account',
    links: [
      { label: 'Admin Login', path: '/admin/login' },
      { label: 'Sign Up', path: '/admin/signup' },
      { label: 'Change Profile', path: '/admin/change-profile' },
    ],
  },
  {
    label: 'Products',
    links: [
      { label: 'View Products', path: '/admin/view-products' },
      { label: 'Add Product', path: '/admin/add-product' },
      { label: 'Update Product', path: '/admin/update-product' },
      { label: 'Delete Product', path: '/admin/delete-product' },
    ],
  },
  {
    label: 'Operations',
    links: [
      { label: 'Manage Orders', path: '/admin/manage-orders' },
      { label: 'Manage Complaints', path: '/admin/manage-complaints' },
    ],
  },
];

const getSidebarItemClass = ({ isActive }) => `admin-sidebar-item${isActive ? ' active' : ''}`;
const getRoleLinkClass = ({ isActive }) => `role-portal-link${isActive ? ' active' : ''}`;

function AdminForms({ role = 'admin' }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isOverview = location.pathname === '/admin' || location.pathname === '/admin/';

  if (role !== 'admin') {
    const config = roleForms[role];

    if (!config) {
      return null;
    }

    return (
      <main className="role-hub">
        <header className="role-hub-header">
          <Link className="role-hub-brand" to="/">The Coffee Club</Link>
          <Link className="role-hub-home" to="/">Home</Link>
        </header>

        <div className="role-portal-body">
          <aside className="role-portal-sidebar">
            <p className="role-portal-label">{config.title.toUpperCase()}</p>
            <nav aria-label={`${config.title} forms`}>
              {config.links.map(({ label, path }) => (
                <NavLink className={getRoleLinkClass} end key={path} to={path}>
                  {label}
                </NavLink>
              ))}
            </nav>
          </aside>

          <section className="role-portal-content">
            <Outlet />
          </section>
        </div>
      </main>
    );
  }

  function handleLogout() {
    sessionStorage.removeItem('adminAuthenticated');
    sessionStorage.removeItem('adminEmail');
    navigate('/admin/login');
  }

  return (
    <main className="admin-dashboard">
      <header className="admin-dashboard-header">
        <Link className="admin-dashboard-brand" to="/">
          The Coffee Club <span>ADMIN</span>
        </Link>
        <div className="admin-dashboard-header-actions">
          <Link className="admin-home-link" to="/">Home</Link>
          <button className="admin-logout-button" type="button" onClick={handleLogout}>
            Sign out
          </button>
        </div>
      </header>

      <div className="admin-dashboard-body">
        <aside className="admin-dashboard-sidebar">
          <p className="admin-dashboard-label">WORKSPACE</p>
          <NavLink className={getSidebarItemClass} to="/admin" end>
            Overview
          </NavLink>

          {adminGroups.map(({ label, links }) => (
            <div key={label}>
              <p className="admin-dashboard-label">{label.toUpperCase()}</p>
              {links.map(({ label: actionLabel, path }) => (
                <NavLink className={getSidebarItemClass} key={path} to={path}>
                  {actionLabel}
                </NavLink>
              ))}
            </div>
          ))}
        </aside>

        <section className="admin-dashboard-content" id="overview" key={location.pathname}>
          {isOverview ? (
            <>
              <p className="admin-dashboard-eyebrow">THE COFFEE CLUB</p>
              <h1>Admin Dashboard</h1>
              <p className="admin-dashboard-intro">
                Manage products, orders, and customer complaints.
              </p>

              <h2>Quick actions</h2>
              <div className="admin-dashboard-grid">
                {adminGroups.map(({ label: group, links }) =>
                  links.map(({ label, path }) => (
                    <Link className="admin-dashboard-action" key={path} to={path}>
                      <span>{group}</span>
                      <strong>{label}</strong>
                      <span className="admin-action-arrow" aria-hidden="true">&rarr;</span>
                    </Link>
                  ))
                )}
              </div>
            </>
          ) : (
            <Outlet />
          )}
        </section>
      </div>
    </main>
  );
}

export default AdminForms;

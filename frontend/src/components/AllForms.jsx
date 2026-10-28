import '../App.css';

// ===== CUSTOMER =====
import CustomerLogin from './forms/CustomerLogin';
import CustomerSignup from './forms/CustomerSignup';
import CustomerReservation from './forms/CustomerReservation';
import CustomerPlaceOrder from './forms/CustomerPlaceOrder';
import CustomerFeedback from './forms/CustomerFeedback';
import CustomerComplaint from './forms/CustomerComplaint';

// ===== ADMIN =====
import AdminLogin from './forms/AdminLogin';
import AdminAddProduct from './forms/AdminAddProduct';
import AdminUpdateProduct from './forms/AdminUpdateProduct';
import AdminDeleteProduct from './forms/AdminDeleteProduct';
import AdminManageOrders from './forms/AdminManageOrders';
import AdminManageComplaints from './forms/AdminManageComplaints';

// ===== RIDER =====
import RiderPickupOrder from './forms/RiderPickupOrder';
import RiderDropOrder from './forms/RiderDropOrder';

function AllForms() {
  return (
    <div className="container py-5">

      {/* ===== CUSTOMER ===== */}
      <CustomerLogin />
      <CustomerSignup />
      <CustomerReservation />
      <CustomerPlaceOrder /> 
      <CustomerFeedback /> 
      <CustomerComplaint /> 

      {/* ===== ADMIN ===== */}
      <AdminLogin /> 
      <AdminAddProduct />
      <AdminUpdateProduct /> 
      <AdminDeleteProduct /> 
      <AdminManageOrders /> 
      <AdminManageComplaints />

      {/* ===== RIDER ===== */}
      <RiderPickupOrder /> 
      <RiderDropOrder />

    </div>
  );
}

export default AllForms;
import {
  createBrowserRouter,
  Navigate,
} from 'react-router-dom';
import Home from './components/Home.jsx';
import AdminForms from './components/AdminForms.jsx';
import CustomerLogin from './components/forms/CustomerLogin.jsx';
import CustomerSignup from './components/forms/CustomerSignup.jsx';
import CustomerReservation from './components/forms/CustomerReservation.jsx';
import CustomerPlaceOrder from './components/forms/CustomerPlaceOrder.jsx';
import CustomerFeedback from './components/forms/CustomerFeedback.jsx';
import CustomerComplaint from './components/forms/CustomerComplaint.jsx';
import AdminLogin from './components/forms/AdminLogin.jsx';
import AdminSignup from './components/forms/AdminSignup.jsx';
import AdminChangeProfile from './components/forms/AdminChangeProfile.jsx';
import AdminAddProduct from './components/forms/AdminAddProduct.jsx';
import AdminUpdateProduct from './components/forms/AdminUpdateProduct.jsx';
import AdminDeleteProduct from './components/forms/AdminDeleteProduct.jsx';
import AdminManageOrders from './components/forms/AdminManageOrders.jsx';
import AdminManageComplaints from './components/forms/AdminManageComplaints.jsx';
import RiderPickupOrder from './components/forms/RiderPickupOrder.jsx';
import RiderDropOrder from './components/forms/RiderDropOrder.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/admin",
    element: <AdminForms />,
    children: [
      { path: "login", element: <AdminLogin /> },
      { path: "sign-in", element: <Navigate to="/admin/login" replace /> },
      { path: "signup", element: <AdminSignup /> },
      { path: "change-profile", element: <AdminChangeProfile /> },
      { path: "add-product", element: <AdminAddProduct /> },
      { path: "update-product", element: <AdminUpdateProduct /> },
      { path: "delete-product", element: <AdminDeleteProduct /> },
      { path: "manage-orders", element: <AdminManageOrders /> },
      { path: "manage-complaints", element: <AdminManageComplaints /> },
    ]
  },
  {
    path: "/customer",
    element: <AdminForms role="customer" />,
    children: [
      { index: true, element: <Navigate to="login" replace /> },
      { path: "login", element: <CustomerLogin /> },
      { path: "signup", element: <CustomerSignup /> },
      { path: "reservation", element: <CustomerReservation /> },
      { path: "place-order", element: <CustomerPlaceOrder /> },
      { path: "feedback", element: <CustomerFeedback /> },
      { path: "complaint", element: <CustomerComplaint /> },
    ]
  },
  {
    path: "/rider",
    element: <AdminForms role="rider" />,
    children: [
      { index: true, element: <Navigate to="pickup-order" replace /> },
      { path: "pickup-order", element: <RiderPickupOrder /> },
      { path: "drop-order", element: <RiderDropOrder /> },
    ]
  },
]);

export default router;
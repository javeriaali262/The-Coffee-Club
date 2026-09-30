import '../App.css';
import LoginForm from './forms/LoginForm';
import SignupForm from './forms/SignupForm';
import ViewProduct from './forms/ViewProduct';
import AddProduct from './forms/AddProduct';
import UpdateProduct from './forms/UpdateProduct';
import DeleteProduct from './forms/DeleteProduct';
import Complaints from './forms/Complaints';
import Membership from './forms/Membership';
import MyProfile from './forms/MyProfile';

function AllForms({ onBack }) {
  return (
    <div className="container py-5" style={{ maxWidth: '700px' }}>
      {/* <button className="btn btn-dark mb-4" onClick={onBack}>← Back to Home</button> */}

      {/*<LoginForm /> */}
      {/* <SignupForm /> */}
      {/* <ViewProduct /> */}
      {/* <AddProduct /> */}
      {/* <UpdateProduct /> */}
      {/* <DeleteProduct /> */}
       <Complaints />
      {/* <Membership /> */}
      {/* <MyProfile /> */}
    </div>
  );
}

export default AllForms;

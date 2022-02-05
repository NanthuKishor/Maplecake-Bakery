import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { removeAdmin } from "../../features/authSlice";
import "./AdminNavbar.css";
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { toast } from "react-toastify";

const AdminNavbar = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const logOutHandler = () => {
    dispatch(removeAdmin());
    signOut(auth)
      .then(() => {
        navigate("/a/admin-login", { replace: true });
        toast.success("Successfully logged out");
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  return (
    <nav className="navbar navbar__transition">
      <div className="notHome__background">
        <div className="adminNavbar__menu__ul">
          <ul>
            <li>
              <NavLink
                to="/a/admin/orders"
                style={({ isActive }) => ({
                  color: isActive ? "yellow" : "link__whiteColor",
                })}
              >
                Orders
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/a/admin/products"
                style={({ isActive }) => ({
                  color: isActive ? "yellow" : "link__whiteColor",
                })}
              >
                Products
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/a/admin/profile"
                style={({ isActive }) => ({
                  color: isActive ? "yellow" : "link__whiteColor",
                })}
              >
                Profile
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/a/admin-login"
                className="link__whiteColor"
                replace={true}
                onClick={logOutHandler}
              >
                Logout
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;

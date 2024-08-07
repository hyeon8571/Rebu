import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";

const dispatch = useDispatch();
const navigate = useNavigate();

const handleLogout = () => {
  // Clear stored tokens or any other necessary cleanup
  localStorage.removeItem("accessToken");

  // Dispatch the logout action
  dispatch(logout());
  alert("logout");
  // Redirect to login or home page
  navigate("/login");
};

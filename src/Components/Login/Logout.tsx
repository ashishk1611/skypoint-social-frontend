import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { logout } from "./authReducer";

export default function LogoutButton() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    const loginTimeStr = localStorage.getItem("loginTime");
    if (loginTimeStr) {
      const loginTime = new Date(loginTimeStr);
      const logoutTime = new Date();
      const sessionDurationMs = logoutTime.getTime() - loginTime.getTime();

      const minutes = Math.floor(sessionDurationMs / 60000);
      const seconds = Math.floor((sessionDurationMs % 60000) / 1000);

      toast.success(`Session Duration: ${minutes}m ${seconds}s`);
      localStorage.removeItem("loginTime");
    }
    dispatch(logout());
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white px-3 py-1 rounded"
    >
      Logout
    </button>
  );
}

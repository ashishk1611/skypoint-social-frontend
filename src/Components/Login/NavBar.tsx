import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import Login from "./Login";
import Logout from "./Logout";

const Navbar = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm px-6 py-3 flex items-center justify-between">
      <div className="text-2xl font-bold text-blue-600 tracking-wide">
        Skypoint Social
      </div>

      <div>
        {user ? (
          <div className="flex items-center gap-3">
            <Avatar sx={{ width: 32, height: 32 }}>
              {user.displayName?.[0] ?? "U"}
            </Avatar>
            <span className="text-sm font-medium text-gray-800">
              {user.displayName}
            </span>
            <Logout />
          </div>
        ) : (
          <Login />
        )}
      </div>
    </header>
  );
};

export default Navbar;

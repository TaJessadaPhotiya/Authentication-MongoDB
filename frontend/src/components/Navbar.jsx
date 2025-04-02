import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Security as SecurityIcon,
  Person as PersonIcon,
  Logout as LogoutIcon,
  AccountCircle as AccountCircleIcon,
  Menu as MenuIcon,
  ArrowDropDown as ArrowDropDownIcon,
  Settings as SettingsIcon,
  Dashboard as DashboardIcon,
  Notifications as NotificationsIcon,
} from "@mui/icons-material";

const Navbar = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <SecurityIcon className="text-white" style={{ fontSize: "2rem" }} />
          <h1 className="text-white text-2xl font-bold">ระบบยืนยันตัวตน</h1>
        </Link>

        <div className="flex items-center space-x-4 relative">
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center text-white hover:text-blue-200 transition duration-300"
            >
              <div className="md:hidden">
                <MenuIcon />
              </div>
              <span className="hidden md:flex items-center">
                <AccountCircleIcon className="mr-1" />
              </span>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-6 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                <Link
                  to="/dashboard"
                  className="block px-4 py-2 text-gray-800 hover:bg-blue-100 flex items-center"
                  onClick={() => setDropdownOpen(false)}
                >
                  <DashboardIcon className="mr-2" />
                  แดชบอร์ด
                </Link>
                <Link
                  to="/notifications"
                  className="block px-4 py-2 text-gray-800 hover:bg-blue-100 flex items-center"
                  onClick={() => setDropdownOpen(false)}
                >
                  <NotificationsIcon className="mr-2" />
                  การแจ้งเตือน
                </Link>
                <Link
                  to="/settings"
                  className="block px-4 py-2 text-gray-800 hover:bg-blue-100 flex items-center"
                  onClick={() => setDropdownOpen(false)}
                >
                  <SettingsIcon className="mr-2" />
                  ตั้งค่า
                </Link>
                {/* เมนูย่อย */}
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-gray-800 hover:bg-blue-100 flex items-center"
                  onClick={() => setDropdownOpen(false)}
                >
                  <PersonIcon className="mr-2" />
                  โปรไฟล์
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setDropdownOpen(false);
                  }}
                  className="w-full text-left block px-4 py-2 text-gray-800 hover:bg-blue-100 flex items-center"
                >
                  <LogoutIcon className="mr-2" />
                  ออกจากระบบ
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import { Link } from "react-router-dom";

const Navbar = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const token = localStorage.getItem("token");

  return (
    <nav className="bg-blue-600 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-semibold">MyAuthApp</div>
        <div className="space-x-4">
          {token ? (
            <button
              onClick={handleLogout}
              className="text-white hover:bg-blue-700 px-4 py-2 rounded-md"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="text-white hover:bg-blue-700 px-4 py-2 rounded-md"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-white hover:bg-blue-700 px-4 py-2 rounded-md"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

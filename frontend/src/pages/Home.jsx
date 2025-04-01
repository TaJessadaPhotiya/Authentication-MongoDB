import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    // หากไม่มี Token หรือ Token หมดอายุ
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-semibold">Welcome to the Home Page!</h1>
    </div>
  );
};

export default Home;

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import {
  Email as EmailIcon,
  Lock as LockIcon,
  AccountCircle as AccountCircleIcon,
} from "@mui/icons-material";
import { CircularProgress } from "@mui/material";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    if (!email || !password) {
      Swal.fire({
        icon: "error",
        title: "โอ๊ะโอ...",
        text: "กรุณากรอกข้อมูลให้ครบทุกช่อง!",
        confirmButtonColor: "#3B82F6",
      });
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      Swal.fire({
        icon: "error",
        title: "อีเมลไม่ถูกต้อง",
        text: "กรุณากรอกอีเมลให้ถูกรูปแบบ!",
        confirmButtonColor: "#3B82F6",
      });
      return false;
    }
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/auth/login", {
        email,
        password,
      });

      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);

      await Swal.fire({
        icon: "success",
        title: "เข้าสู่ระบบสำเร็จ",
        text: "ยินดีต้อนรับ! กำลังเปลี่ยนหน้า...",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        confirmButtonColor: "#3B82F6",
      });

      navigate("/");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "เข้าสู่ระบบล้มเหลว",
        text:
          err.response?.data?.message || "ข้อมูลไม่ถูกต้องหรือระบบมีข้อผิดพลาด",
        confirmButtonColor: "#3B82F6",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <AccountCircleIcon
              className="text-blue-600"
              style={{ fontSize: "4rem" }}
            />
            <h2 className="mt-4 text-3xl font-extrabold text-gray-900">
              เข้าสู่ระบบบัญชีของคุณ
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              หรือ{" "}
              <Link
                to="/register"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                สร้างบัญชีใหม่
              </Link>
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                อีเมล
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <EmailIcon
                    className="text-gray-400"
                    style={{ fontSize: "1.25rem" }}
                  />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="py-3 pl-10 block w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="คุณ@ตัวอย่าง.com"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                รหัสผ่าน
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockIcon
                    className="text-gray-400"
                    style={{ fontSize: "1.25rem" }}
                  />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="py-3 pl-10 block w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  จดจำฉัน
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="/"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  ลืมรหัสผ่าน?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  isLoading ? "opacity-75 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? (
                  <>
                    <CircularProgress size={20} className="text-white mr-2" />
                    กำลังเข้าสู่ระบบ...
                  </>
                ) : (
                  "เข้าสู่ระบบ"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

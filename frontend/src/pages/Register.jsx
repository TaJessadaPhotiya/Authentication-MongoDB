import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  HowToReg as HowToRegIcon,
} from "@mui/icons-material";
import { CircularProgress } from "@mui/material";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    if (!username || !email || !password) {
      Swal.fire({
        icon: "error",
        title: "แบบฟอร์มไม่สมบูรณ์",
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
    if (password.length < 6) {
      Swal.fire({
        icon: "error",
        title: "รหัสผ่านอ่อนแอ",
        text: "รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร!",
        confirmButtonColor: "#3B82F6",
      });
      return false;
    }
    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      await axios.post("http://localhost:5000/auth/register", {
        username,
        email,
        password,
      });

      await Swal.fire({
        icon: "success",
        title: "ลงทะเบียนสำเร็จ",
        text: "บัญชีของคุณถูกสร้างแล้ว! กำลังเปลี่ยนหน้า...",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        confirmButtonColor: "#3B82F6",
      });

      navigate("/login");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "ลงทะเบียนล้มเหลว",
        text:
          err.response?.data?.error || "การลงทะเบียนไม่สำเร็จ กรุณาลองอีกครั้ง",
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
            <HowToRegIcon
              className="text-blue-600"
              style={{ fontSize: "4rem" }}
            />
            <h2 className="mt-4 text-3xl font-extrabold text-gray-900">
              สร้างบัญชีใหม่
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              หรือ{" "}
              <Link
                to="/login"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                เข้าสู่ระบบบัญชีที่มีอยู่
              </Link>
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleRegister}>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                ชื่อผู้ใช้
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <PersonIcon
                    className="text-gray-400"
                    style={{ fontSize: "1.25rem" }}
                  />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="py-3 pl-10 block w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="ชื่อผู้ใช้"
                />
              </div>
            </div>

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
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="py-3 pl-10 block w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="••••••••"
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร
              </p>
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                  required
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="font-medium text-gray-700">
                  ฉันยอมรับ{" "}
                  <a href="#" className="text-blue-600 hover:text-blue-500">
                    ข้อกำหนดและเงื่อนไข
                  </a>
                </label>
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
                    กำลังลงทะเบียน...
                  </>
                ) : (
                  "ลงทะเบียน"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

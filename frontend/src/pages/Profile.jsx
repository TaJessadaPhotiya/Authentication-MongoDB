import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FiUser,
  FiMail,
  FiKey,
  FiLoader,
  FiAlertCircle,
  FiEdit,
  FiSave,
  FiX,
} from "react-icons/fi";

function Profile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    username: "",
    email: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          setError("กรุณาเข้าสู่ระบบเพื่อดูโปรไฟล์");
          setLoading(false);
          return;
        }

        const response = await axios.get("http://localhost:5000/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserData(response.data);
        setEditForm({
          username: response.data.username,
          email: response.data.email,
        });
      } catch (err) {
        setError(err.response?.data?.error || "ไม่สามารถโหลดข้อมูลโปรไฟล์ได้");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setError("กรุณาเข้าสู่ระบบเพื่อแก้ไขโปรไฟล์");
        return;
      }

      const response = await axios.put(
        "http://localhost:5000/auth/profile",
        editForm,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUserData(response.data);
      setIsEditing(false);
      setError("");
    } catch (err) {
      setError(err.response?.data?.error || "อัปเดตโปรไฟล์ไม่สำเร็จ");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="p-8 bg-white rounded-xl shadow-md w-full max-w-md text-center">
          <FiLoader className="animate-spin text-4xl text-blue-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-700">
            กำลังโหลดโปรไฟล์...
          </h2>
          <p className="text-gray-500 mt-2">
            กรุณารอสักครู่ขณะเรากำลังดึงข้อมูลของคุณ
          </p>
        </div>
      </div>
    );
  }

  if (error && !isEditing) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="p-8 bg-white rounded-xl shadow-md w-full max-w-md text-center">
          <FiAlertCircle className="text-4xl text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-700">
            เกิดข้อผิดพลาด
          </h2>
          <p className="text-gray-600 mt-2">{error}</p>
          <button
            onClick={() => (window.location.href = "/login")}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            ไปที่หน้าเข้าสู่ระบบ
          </button>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="p-8 bg-white rounded-xl shadow-md w-full max-w-md text-center">
          <FiUser className="text-4xl text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-700">
            ไม่พบข้อมูลผู้ใช้
          </h2>
          <p className="text-gray-500 mt-2">
            ไม่สามารถดึงข้อมูลโปรไฟล์ของคุณได้
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white">
          <h1 className="text-2xl font-bold">
            {isEditing ? "แก้ไขโปรไฟล์" : "โปรไฟล์ผู้ใช้"}
          </h1>
          <p className="opacity-90">
            {isEditing
              ? "อัปเดตข้อมูลของคุณ"
              : "ยินดีต้อนรับสู่หน้าข้อมูลส่วนตัว"}
          </p>
        </div>

        {error && isEditing && (
          <div className="p-4 bg-red-100 text-red-700">{error}</div>
        )}

        <div className="p-6 space-y-6">
          {isEditing ? (
            <>
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <FiUser className="text-blue-600 text-xl" />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-500 uppercase tracking-wider">
                    ชื่อผู้ใช้
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={editForm.username}
                    onChange={handleEditChange}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-indigo-100 p-3 rounded-full">
                  <FiMail className="text-indigo-600 text-xl" />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-500 uppercase tracking-wider">
                    อีเมล
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={editForm.email}
                    onChange={handleEditChange}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <FiUser className="text-blue-600 text-xl" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 uppercase tracking-wider">
                    ชื่อผู้ใช้
                  </label>
                  <p className="mt-1 text-lg font-medium text-gray-800">
                    {userData.username}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-indigo-100 p-3 rounded-full">
                  <FiMail className="text-indigo-600 text-xl" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 uppercase tracking-wider">
                    อีเมล
                  </label>
                  <p className="mt-1 text-lg font-medium text-gray-800">
                    {userData.email}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-purple-100 p-3 rounded-full">
                  <FiKey className="text-purple-600 text-xl" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 uppercase tracking-wider">
                    สิทธิ์การใช้งาน
                  </label>
                  <p className="mt-1 text-lg font-medium text-gray-800 capitalize">
                    {userData.role === "admin" ? "admin" : "user"}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex space-x-4">
          {isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(false)}
                className="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors flex items-center justify-center"
              >
                <FiX className="mr-2" />
                ยกเลิก
              </button>
              <button
                onClick={handleSave}
                className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors flex items-center justify-center"
              >
                <FiSave className="mr-2" />
                บันทึกการเปลี่ยนแปลง
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors flex items-center justify-center"
            >
              <FiEdit className="mr-2" />
              แก้ไขโปรไฟล์
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;

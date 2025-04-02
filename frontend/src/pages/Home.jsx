import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Person as PersonIcon,
  Lock as LockIcon,
  History as HistoryIcon,
} from "@mui/icons-material";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            ยินดีต้อนรับสู่ระบบยืนยันตัวตน
          </h2>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-600">
            ระบบการยืนยันตัวตนที่ปลอดภัยพร้อมฟีเจอร์ขั้นสูง
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "โปรไฟล์ผู้ใช้",
              description: "จัดการข้อมูลส่วนตัวและการตั้งค่าต่างๆ",
              icon: <PersonIcon style={{ fontSize: "1.5rem" }} />,
            },
            {
              title: "ความปลอดภัย",
              description: "ตั้งค่าความปลอดภัยของบัญชีผู้ใช้",
              icon: <LockIcon style={{ fontSize: "1.5rem" }} />,
            },
            {
              title: "ประวัติการใช้งาน",
              description: "ดูประวัติการใช้งานล่าสุดของคุณ",
              icon: <HistoryIcon style={{ fontSize: "1.5rem" }} />,
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white overflow-hidden shadow rounded-lg hover:shadow-xl transition duration-300"
            >
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-blue-500 rounded-md p-3 text-white">
                    {feature.icon}
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <h3 className="text-lg font-medium text-gray-900">
                      {feature.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;

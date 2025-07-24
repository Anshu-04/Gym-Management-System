import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import lg2 from "../assets/register.jpg";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://gym-management-system-4vg8.onrender.com/api/login",
        formData
      );
      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      toast.success("Login successful");

      setTimeout(() => {
        if (user.role === "admin") navigate("/admin");
        else if (user.role === "member") navigate("/member");
        else navigate("/user");
      }, 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex max-h-screen">
      <ToastContainer />

      {/* Left Side: Form */}
      <div className="w-full md:w-1/2 p-8 md:p-16 flex items-center justify-center bg-white">
        <div className="w-full max-w-md space-y-6 bg-white p-8 rounded-2xl shadow-lg transition duration-300">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-800">
              Welcome Back
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Login to your GYM account
            </p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md transition duration-200"
            >
              Login
            </button>
          </form>
          <p className="text-sm text-center text-gray-600">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side: Image */}
      <div className="hidden md:block md:w-1/2 bg-gray-100">
        <img src={lg2} alt="Gym" className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default Login;

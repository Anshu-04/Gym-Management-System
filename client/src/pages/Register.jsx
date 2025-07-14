import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import lg1 from '../assets/login.jpg'

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user'
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const { username, email, password, role } = formData;
      const res = await axios.post('http://localhost:5000/api/register', {
        username,
        email,
        password,
        role
      });

      toast.success(res.data.message || "Registration successful!");
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex max-h-screen">
      <ToastContainer />

      {/* Left Side: Image */}
      <div className="hidden md:block md:w-1/2 bg-gray-100">
        <img
          src={lg1}
          alt="Gym"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Side: Form */}
      <div className="w-full md:w-1/2 p-8 md:p-16 flex justify-center bg-white">
        <div className="w-full max-w-md space-y-6 bg-white p-8 rounded-2xl shadow-lg transition duration-300">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-800">Create Account</h2>
            <p className="text-sm text-gray-500 mt-1">Join our fitness community</p>
          </div>
          <form onSubmit={handleRegister} className="space-y-4">
            <input
              type="text"
              name="username"
              placeholder="Username"
              required
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              required
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              name="role"
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="user">User</option>
              <option value="member">Member</option>
              <option value="admin">Admin</option>
            </select>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition duration-200"
            >
              Register
            </button>
          </form>
          <p className="text-sm text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

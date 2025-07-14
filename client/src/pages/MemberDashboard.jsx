import React, { useEffect, useState } from "react";
import axios from "axios";
import { CreditCard, Bell, ShoppingCart, Utensils, LogOut } from 'lucide-react';
import DietPlans from "./DietPlans";
import SupplementStore from "./SupplementStore";
import { useNavigate } from 'react-router-dom';


const TABS = {
  BILLS: "bills",
  NOTIFICATIONS: "notifications",
  SUPPLEMENTS: "supplements",
  DIET: "diet",
  LOGOUT: "logout",
};

const MemberDashboard = () => {
  const navigate = useNavigate();

const handleLogout = () => {
  navigate('/');
};

  const [bills, setBills] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [tab, setTab] = useState(TABS.BILLS);
  const member = JSON.parse(localStorage.getItem("user")); // includes _id

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/bills/member/${member._id}`)
      .then((res) => setBills(res.data));
  }, [member._id]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/notifications")
      .then((res) => setNotifications(res.data));
  }, []);

  const handlePay = async (id) => {
    await axios.put(`http://localhost:5000/api/bills/${id}/pay`);
    // Refresh bills
    const res = await axios.get(`http://localhost:5000/api/bills/member/${member._id}`);
    setBills(res.data);
  };

  const sidebarItems = [
    { icon: CreditCard, label: 'My Bills', key: TABS.BILLS },
    { icon: Bell, label: 'My Notifications', key: TABS.NOTIFICATIONS },
    { icon: ShoppingCart, label: 'Supplement Store', key: TABS.SUPPLEMENTS },
    { icon: Utensils, label: 'Diet Plans', key: TABS.DIET },
    { icon: LogOut, label: 'Logout', key: TABS.LOGOUT}
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg border-r">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900">🏋️ Member Panel</h2>
          <p className="text-sm text-gray-600 mt-2">Welcome, {member.username}</p>
        </div>
        
        <nav className="mt-6">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.key}
                onClick={() => setTab(item.key)}
                className={`w-full flex items-center px-6 py-3 text-left transition-colors ${
                  tab === item.key 
                    ? 'bg-blue-50 border-r-2 border-blue-600 text-blue-600' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className="h-5 w-5 mr-3" />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <header className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Member Dashboard</h1>
          </div>
        </header>

        {/* Content Area */}
        <main className="p-6">
          {tab === TABS.BILLS && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-xl font-bold text-gray-900">My Bills</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issued On</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {bills.map((b) => (
                        <tr key={b._id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">₹{b.amount}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(b.dueDate).toLocaleDateString()}
                          </td>
                          <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                            b.status === "Paid" ? "text-green-600" : "text-red-600"
                          }`}>
                            {b.status}
                            {b.status === "Unpaid" && (
                              <button 
                                onClick={() => handlePay(b._id)} 
                                className="ml-3 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors text-xs"
                              >
                                Mark as Paid
                              </button>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(b.issuedOn).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {tab === TABS.NOTIFICATIONS && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Notifications</h2>
                <div className="space-y-3">
                  {notifications.map(n => (
                    <div key={n._id} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full uppercase mb-2">
                            {n.type || "NOTICE"}
                          </span>
                          <p className="text-gray-900 font-medium">{n.message}</p>
                        </div>
                        <span className="text-sm text-gray-500">{new Date(n.createdOn).toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {tab === TABS.SUPPLEMENTS && (
            <div className="bg-white rounded-lg shadow p-6">
              <SupplementStore />
            </div>
          )}

          {tab === TABS.DIET && (
            <div className="bg-white rounded-lg shadow p-6">
              <DietPlans />
            </div>
          )}

          {tab === TABS.LOGOUT && (
  <div className="bg-white rounded-lg shadow p-6">
    <div className="flex justify-between items-center">
      <span className="text-gray-800 font-medium">Click to Logout</span>
      <button
        onClick={handleLogout}
        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1.5 rounded-md text-sm font-medium transition duration-200"
      >
        Logout
      </button>
    </div>
  </div>
)}


        </main>
      </div>
    </div>
  );
};

export default MemberDashboard;
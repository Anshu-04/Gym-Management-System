import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Users, CreditCard, Bell, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    navigate('/');
  };
  const [members, setMembers] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', phone: '', plan: '' });
  const [editingId, setEditingId] = useState(null);
  const [bills, setBills] = useState([]);
  const [billForm, setBillForm] = useState({ userId: '', amount: '', dueDate: '', status: 'Unpaid' });
  const [notifications, setNotifications] = useState([]);
  const [notify, setNotify] = useState({ message: '', type: 'announcement' });
  const [tab, setTab] = useState('members');
  const [memberUsers, setMemberUsers] = useState([]);

  // Fetch all members for member CRUD
  const fetchMembers = async () => {
    const res = await axios.get('http://localhost:5000/api/members');
    setMembers(res.data);
  };

  // Fetch member users (from User model)
  const fetchMemberUsers = async () => {
    const res = await axios.get('http://localhost:5000/api/users');
    const onlyMembers = res.data.filter(user => user.role === 'member');
    setMemberUsers(onlyMembers);
  };

  // Fetch all bills
  const fetchBills = async () => {
    const res = await axios.get('http://localhost:5000/api/bills');
    setBills(res.data);
  };

  // Fetch notifications
  const fetchNotifications = async () => {
    const res = await axios.get('http://localhost:5000/api/notifications');
    setNotifications(res.data);
  };

  useEffect(() => {
    fetchMembers();
    fetchBills();
    fetchNotifications();
    fetchMemberUsers();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/members/${editingId}`, form);
      } else {
        await axios.post('http://localhost:5000/api/members', form);
      }
      setForm({ name: '', email: '', phone: '', plan: '' });
      setEditingId(null);
      fetchMembers();
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  const handleEdit = (member) => {
    setForm(member);
    setEditingId(member._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this member?")) {
      await axios.delete(`http://localhost:5000/api/members/${id}`);
      fetchMembers();
    }
  };

  const handleBillChange = (e) => {
    setBillForm({ ...billForm, [e.target.name]: e.target.value });
  };

  const handleBillSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/bills', billForm);
    setBillForm({ userId: '', amount: '', dueDate: '', status: 'Unpaid' });
    fetchBills();
  };

  const handleNotifyChange = (e) => {
    setNotify({ ...notify, [e.target.name]: e.target.value });
  };

  const handleNotifySubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/notifications', notify);
    setNotify({ message: '', type: 'announcement' });
    fetchNotifications();
  };

  const sidebarItems = [
    { icon: Users, label: 'Manage Members', key: 'members' },
    { icon: CreditCard, label: 'Billing', key: 'billing' },
    { icon: Bell, label: 'Notifications', key: 'notifications' },
    { icon: Settings, label: 'Settings', key: 'settings' }
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg border-r">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900">🏋️ Admin Panel</h2>
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
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          </div>
        </header>

        {/* Content Area */}
        <main className="p-6">
          {tab === 'members' && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Manage Members</h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <input 
                    type="text" 
                    name="name" 
                    placeholder="Name" 
                    value={form.name} 
                    onChange={handleChange} 
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    required 
                  />
                  <input 
                    type="email" 
                    name="email" 
                    placeholder="Email" 
                    value={form.email} 
                    onChange={handleChange} 
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    required 
                  />
                  <input 
                    type="text" 
                    name="phone" 
                    placeholder="Phone" 
                    value={form.phone} 
                    onChange={handleChange} 
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  />
                  <input 
                    type="text" 
                    name="plan" 
                    placeholder="Plan" 
                    value={form.plan} 
                    onChange={handleChange} 
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  />
                  <button 
                    type="submit" 
                    className="md:col-span-2 lg:col-span-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    {editingId ? 'Update' : 'Add'} Member
                  </button>
                </form>
              </div>

              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {members.map((m) => (
                        <tr key={m._id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{m.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{m.email}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{m.phone}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{m.plan}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                            <button 
                              onClick={() => handleEdit(m)} 
                              className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition-colors"
                            >
                              Edit
                            </button>
                            <button 
                              onClick={() => handleDelete(m._id)} 
                              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {tab === 'billing' && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Assign New Bill</h2>
                <form onSubmit={handleBillSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <select 
                    name="userId" 
                    value={billForm.userId} 
                    onChange={handleBillChange} 
                    required 
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">-- Select Member User --</option>
                    {memberUsers.map((u) => (
                      <option key={u._id} value={u._id}>{u.username} ({u.email})</option>
                    ))}
                  </select>
                  <input 
                    type="number" 
                    name="amount" 
                    placeholder="Amount" 
                    value={billForm.amount} 
                    onChange={handleBillChange} 
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    required 
                  />
                  <input 
                    type="date" 
                    name="dueDate" 
                    value={billForm.dueDate} 
                    onChange={handleBillChange} 
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    required 
                  />
                  <select 
                    name="status" 
                    value={billForm.status} 
                    onChange={handleBillChange} 
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Unpaid">Unpaid</option>
                    <option value="Paid">Paid</option>
                  </select>
                  <button 
                    type="submit" 
                    className="md:col-span-2 lg:col-span-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
                  >
                    Add Bill
                  </button>
                </form>
              </div>

              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900">All Bills</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {bills.map((b) => (
                        <tr key={b._id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{b.userId?.username}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{b.amount}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(b.dueDate).toLocaleDateString()}</td>
                          <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${b.status === 'Paid' ? 'text-green-600' : 'text-red-600'}`}>
                            {b.status}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {tab === 'notifications' && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Send Notification</h2>
                <form onSubmit={handleNotifySubmit} className="space-y-4">
                  <input 
                    type="text" 
                    name="message" 
                    value={notify.message} 
                    onChange={handleNotifyChange} 
                    placeholder="Enter message" 
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    required 
                  />
                  <select 
                    name="type" 
                    value={notify.type} 
                    onChange={handleNotifyChange} 
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="announcement">Announcement</option>
                    <option value="reminder">Reminder</option>
                  </select>
                  <button 
                    type="submit" 
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Send
                  </button>
                </form>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">All Notifications</h3>
                <div className="space-y-3">
                  {notifications.map(n => (
                    <div key={n._id} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full uppercase mb-2">
                            {n.type}
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

          {tab === 'settings' && (
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

export default AdminDashboard;
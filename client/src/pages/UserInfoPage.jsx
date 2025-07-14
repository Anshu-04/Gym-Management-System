import React from 'react';
import { Dumbbell, MapPin, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UserInfoPage = () => {
  const navigate = useNavigate();

const handleLogout = () => {
  navigate('/');
};
  return (
 <div className="min-h-screen bg-gray-50">
      {/* Header Navbar */}
      <nav className="bg-white shadow-sm border-b">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between items-center h-16">
      {/* Left: Logo */}
      <div className="flex items-center">
        <Dumbbell className="h-8 w-8 text-yellow-400 mr-3" />
        <h1 className="text-xl font-bold text-gray-900">Golden Gym</h1>
      </div>

      {/* Center: Nav Links */}
      <div className="flex space-x-8">
        <a href="#" className="text-gray-700 hover:text-yellow-600 font-medium">Home</a>
        <a href="#" className="text-gray-700 hover:text-yellow-600 font-medium">About</a>
        <a href="#" className="text-gray-700 hover:text-yellow-600 font-medium">Contact</a>
      </div>

      {/* Right: Logout */}
      <div>
        <button
          onClick={handleLogout}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1.5 rounded-md text-sm font-medium transition duration-200"
        >
          Logout
        </button>
      </div>
    </div>
  </div>
</nav>


      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h1 className="text- 4xl font-bold text-gray-900 mb-4">
            Welcome!
          </h1>
          <p className="text-xl text-gray-600">Discover our amazing facilities and membership options</p>
        </div>

        {/* Image Carousel Placeholder */}
        <div className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="h-64 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
              <p className="text-white text-lg font-semibold">Cardio Zone</p>
            </div>
            <div className="h-64 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
              <p className="text-white text-lg font-semibold">Weight Training</p>
            </div>
            <div className="h-64 bg-gradient-to-r from-green-400 to-green-600 rounded-lg flex items-center justify-center">
              <p className="text-white text-lg font-semibold">Group Classes</p>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">About Golden Gym</h2>
            <p className="text-gray-600 mb-4">
              At Golden Gym, we're committed to helping you achieve your fitness goals. Our state-of-the-art facility 
              offers everything you need for a complete workout experience.
            </p>
            <p className="text-gray-600">
              Whether you're a beginner or an experienced athlete, our professional trainers and modern equipment 
              will support your journey to better health and fitness.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Facilities</h2>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
                Modern cardio equipment with entertainment systems
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
                Complete free weights and resistance training area
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
                Group fitness classes including yoga and Zumba
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
                Personal training and nutrition counseling
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
                Steam room and sauna facilities
              </li>
            </ul>
          </div>
        </div>

        {/* Membership CTA */}
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Your Fitness Journey?</h2>
          <p className="text-white mb-6">Join our community of fitness enthusiasts and transform your life today!</p>
          <button className="bg-white text-yellow-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Explore Membership Plans
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Dumbbell className="h-8 w-8 text-yellow-400 mr-3" />
                <h3 className="text-xl font-bold">Golden Gym</h3>
              </div>
              <p className="text-gray-400">Your fitness journey starts here.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Address</h4>
              <div className="flex items-start text-gray-400">
                <MapPin className="h-5 w-5 mr-2 mt-1" />
                <p>123 Fitness Street<br />Mumbai, Maharashtra 400001</p>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <div className="flex items-center text-gray-400 mb-2">
                <Phone className="h-5 w-5 mr-2" />
                <p>+91 98765 43210</p>
              </div>
              <div className="flex items-center text-gray-400">
                <Phone className="h-5 w-5 mr-2" />
                <p>info@goldengym.com</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default UserInfoPage;

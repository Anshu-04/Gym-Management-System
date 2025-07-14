import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
      <div className="text-center p-12 bg-white rounded-xl shadow-xl max-w-lg w-full mx-4">
        {/* Logo/Icon */}
        <div className="text-5xl mb-6">🏋️</div>
        
        <h1 className="text-5xl font-bold mb-4 text-gray-800">
          Welcome to <span className="text-yellow-400">Golden</span> GYM
        </h1>
        
        <p className="text-gray-600 mb-8 text-lg leading-relaxed">
          Your fitness journey starts here. Join our community and transform your life.
        </p>
        
        {/* Quick Stats */}
        <div className="flex justify-center space-x-8 mb-8 text-sm text-gray-500">
          <div>
            <div className="font-semibold text-blue-600">500+</div>
            <div>Members</div>
          </div>
          <div>
            <div className="font-semibold text-green-600">24/7</div>
            <div>Access</div>
          </div>
          <div>
            <div className="font-semibold text-blue-600">10+</div>
            <div>Trainers</div>
          </div>
        </div>
        
        <div className="space-y-4">
          <Link 
            to="/login" 
            className="block bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-medium transition-all hover:shadow-lg hover:scale-105"
          >
            Login
          </Link>
          <Link 
            to="/register" 
            className="block bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition-all hover:shadow-lg hover:scale-105"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
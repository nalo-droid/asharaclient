import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import apiUrl from '../../utils/apiUrl';

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError(`Unable to load dashboard data: ${error.message}`);
      }
    };

    fetchUserData();
  }, []);

  const handleOrderHistoryClick = () => {
    navigate('/orders');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Request Design Card */}
          <Link 
            to="/request-design" 
            className="bg-blue-600 text-white rounded-lg shadow-sm p-5 hover:shadow-md transition-all duration-200 transform hover:-translate-y-1 hover:bg-blue-700 cursor-pointer"
          >
            <h2 className="text-lg font-semibold text-white mb-1.5">Request Design</h2>
            <p className="text-blue-100 text-sm">Submit a new design request for your project</p>
          </Link>

          {/* Order History Card */}
          <Link 
            to="/orders"
            className="bg-blue-600 text-white rounded-lg shadow-sm p-5 hover:shadow-md transition-all duration-200 transform hover:-translate-y-1 hover:bg-blue-700 cursor-pointer"
          >
            <h2 className="text-lg font-semibold text-white mb-1.5">Order History</h2>
            <p className="text-blue-100 text-sm">View your design request history</p>
          </Link>

          {/* Profile Card */}
          <Link 
            to="/profile" 
            className="bg-blue-600 text-white rounded-lg shadow-sm p-5 hover:shadow-md transition-all duration-200 transform hover:-translate-y-1 hover:bg-blue-700 cursor-pointer"
          >
            <h2 className="text-lg font-semibold text-white mb-1.5">Profile</h2>
            <p className="text-blue-100 text-sm">View and manage your profile settings</p>
          </Link>
        </div>

        {error && (
          <div className="mt-6 bg-red-50 border border-red-200 rounded-md p-4">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {/* Quick Stats Section */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-sm font-medium text-gray-500">Pending Requests</h3>
              <p className="mt-2 text-3xl font-semibold text-gray-900">-</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-sm font-medium text-gray-500">In Progress</h3>
              <p className="mt-2 text-3xl font-semibold text-gray-900">-</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-sm font-medium text-gray-500">Completed</h3>
              <p className="mt-2 text-3xl font-semibold text-gray-900">-</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
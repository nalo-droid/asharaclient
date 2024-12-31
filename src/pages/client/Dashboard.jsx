import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [recentOrders, setRecentOrders] = useState([]);
  const [savedDesigns, setSavedDesigns] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const [ordersResponse, designsResponse] = await Promise.all([
          fetch('/api/orders/recent'),
          fetch('/api/designs/saved')
        ]);
        
        const orders = await ordersResponse.json();
        const designs = await designsResponse.json();
        
        setRecentOrders(orders);
        setSavedDesigns(designs);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <div className="container-xl mx-auto py-8">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Stats Section */}
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Overview</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* ... stats content ... */}
            </div>
          </div>

          {/* Recent Orders Section */}
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm overflow-x-auto">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Recent Orders</h2>
            {/* ... orders content ... */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
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
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome, {user?.name}</h1>
        <p className="text-gray-600 mt-2">Manage your designs and orders</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-4">
            <Link 
              to="/designcatalog" 
              className="block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-center"
            >
              Browse Designs
            </Link>
            <Link 
              to="/orders" 
              className="block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-center"
            >
              View Orders
            </Link>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
          <div className="space-y-4">
            {recentOrders.length === 0 ? (
              <p className="text-gray-600">No recent orders</p>
            ) : (
              recentOrders.map(order => (
                <div key={order.id} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{order.designName}</p>
                    <p className="text-sm text-gray-500">{order.date}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    order.status === 'completed' ? 'bg-green-100 text-green-800' :
                    order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {order.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Saved Designs */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Saved Designs</h2>
          <div className="grid grid-cols-2 gap-4">
            {savedDesigns.length === 0 ? (
              <p className="text-gray-600">No saved designs</p>
            ) : (
              savedDesigns.map(design => (
                <div key={design.id} className="relative group">
                  <img 
                    src={design.thumbnail} 
                    alt={design.name}
                    className="w-full h-32 object-cover rounded-md"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Link 
                      to={`/customize/${design.id}`}
                      className="text-white bg-blue-600 px-4 py-2 rounded-md"
                    >
                      View Design
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
import { useState } from 'react';
import { Link } from 'react-router-dom';

const DesignCatalog = () => {
  const [filters, setFilters] = useState({
    category: '',
    style: '',
    search: ''
  });

  const designs = [
    {
      id: 1,
      name: 'Modern Villa',
      category: 'Residential',
      style: 'Modern',
      area: '325 m²',
      bedrooms: 4,
      thumbnail: 'https://placehold.co/400x300',
      description: 'Contemporary 4-bedroom villa with open floor plan'
    },
    {
      id: 2,
      name: 'Urban Apartment',
      category: 'Residential',
      style: 'Contemporary',
      area: '111 m²',
      bedrooms: 2,
      thumbnail: 'https://placehold.co/400x300',
      description: 'Modern 2-bedroom apartment with city views'
    },
    // Add more designs as needed
  ];

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const filteredDesigns = designs.filter(design => {
    const matchesSearch = design.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                         design.description.toLowerCase().includes(filters.search.toLowerCase());
    const matchesCategory = !filters.category || design.category.toLowerCase() === filters.category.toLowerCase();
    const matchesStyle = !filters.style || design.style.toLowerCase() === filters.style.toLowerCase();

    return matchesSearch && matchesCategory && matchesStyle;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Design Catalog</h1>
            <p className="text-gray-600">Browse and customize our architectural designs</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link
              to="/calculator"
              className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              <span>Cost Calculator</span>
            </Link>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="">All Categories</option>
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
                <option value="industrial">Industrial</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Style
              </label>
              <select
                name="style"
                value={filters.style}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="">All Styles</option>
                <option value="modern">Modern</option>
                <option value="contemporary">Contemporary</option>
                <option value="traditional">Traditional</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Search
              </label>
              <input
                type="text"
                name="search"
                value={filters.search}
                onChange={handleFilterChange}
                placeholder="Search designs..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Design Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDesigns.map((design) => (
            <div key={design.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <img
                src={design.thumbnail}
                alt={design.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{design.name}</h3>
                    <p className="text-sm text-gray-500">{design.category}</p>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4">{design.description}</p>
                
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-gray-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                    </svg>
                    <span className="text-sm text-gray-600">{design.area}</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-gray-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                    </svg>
                    <span className="text-sm text-gray-600">{design.bedrooms} Bedrooms</span>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Link
                    to={`/customize/${design.id}`}
                    className="flex-1 bg-blue-600 text-white text-center py-2 rounded-md hover:bg-blue-700"
                  >
                    Customize
                  </Link>
                  <button
                    className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DesignCatalog;
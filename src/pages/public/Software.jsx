import React from 'react';
import { Link } from 'react-router-dom';
import { FaRuler, FaCalculator, FaCube, FaChartBar, FaCheck } from 'react-icons/fa';

const Software = () => {
  const products = [
    {
      id: 'structural-detailing',
      name: 'Ashara Structural Detailing',
      description: 'Automate your structural detailing workflow in AutoCAD',
      icon: <FaCube className="w-12 h-12 text-blue-600 mb-4" />,
      features: [
        'Automated rebar detailing',
        'Smart section generation',
        'Automatic dimensioning',
        'Customizable detail templates',
        'Beam and column schedules',
        'DWG and PDF export',
      ],
      pricing: [
        { duration: '1 Month', price: '2,500' },
        { duration: '3 Months', price: '6,750', savings: '10%' },
        { duration: '6 Months', price: '12,000', savings: '20%' },
        { duration: '1 Year', price: '20,000', savings: '33%' },
      ]
    },
    {
      id: 'takeoff-boq',
      name: 'Ashara Takeoff BOQ',
      description: 'Streamline quantity takeoff and BOQ generation',
      icon: <FaCalculator className="w-12 h-12 text-blue-600 mb-4" />,
      features: [
        'Automated quantity extraction',
        'Custom rate database',
        'Excel BOQ export',
        'Material estimation',
        'Cost analysis reports',
        'Project comparison tools',
      ],
      pricing: [
        { duration: '1 Month', price: '2,000' },
        { duration: '3 Months', price: '5,400', savings: '10%' },
        { duration: '6 Months', price: '9,600', savings: '20%' },
        { duration: '1 Year', price: '16,000', savings: '33%' },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      {/* Hero Section */}
      <div className="bg-white py-16 mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              AutoCAD Automation Tools
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transform your AutoCAD workflow with our powerful automation tools for structural detailing and quantity takeoff.
            </p>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <FaRuler className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-4">Automated Detailing</h3>
            <p className="text-gray-600">
              Generate structural details automatically with intelligent prompts and customizable templates.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <FaChartBar className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-4">Smart Quantity Takeoff</h3>
            <p className="text-gray-600">
              Extract quantities directly from AutoCAD drawings and generate detailed BOQs automatically.
            </p>
          </div>
        </div>
      </div>

      {/* Products Section */}
      {products.map((product) => (
        <div key={product.id} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-8">
              <div className="text-center mb-8">
                {product.icon}
                <h2 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h2>
                <p className="text-xl text-gray-600">{product.description}</p>
              </div>

              {/* Features */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Features</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <FaCheck className="text-green-500 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pricing Plans */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Subscription Plans</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {product.pricing.map((plan, index) => (
                    <div key={index} className="border rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                      <h4 className="text-lg font-semibold mb-2">{plan.duration}</h4>
                      <p className="text-3xl font-bold text-blue-600 mb-2">
                        ETB {plan.price}
                      </p>
                      {plan.savings && (
                        <p className="text-green-600 text-sm mb-4">Save {plan.savings}</p>
                      )}
                      <Link
                        to="/register"
                        className="block w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
                      >
                        Get Started
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Software; 
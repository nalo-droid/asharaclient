import { Link, useNavigate } from 'react-router-dom';

const Services = () => {
  const navigate = useNavigate();
  const isAuthenticated = false; // Replace with actual auth check

  const handleRequestService = () => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  };

  const services = [
    {
      title: 'Architectural Design',
      description: 'Comprehensive architectural design services for your project',
      features: [
        'Concept Development',
        'Design Development',
        'Construction Documents',
        'Building Permit Drawings',
        '3D Visualization',
        'Multiple Design Revisions'
      ]
    },
    {
      title: 'Structural Design',
      description: 'Professional structural engineering and design solutions',
      features: [
        'Structural Analysis',
        'Foundation Design',
        'Framing Plans',
        'Structural Calculations',
        'Seismic Design',
        'Construction Details'
      ]
    },
    {
      title: '3D Visualization',
      description: 'High-quality 3D rendering and visualization services',
      features: [
        'Photorealistic Renders',
        'Virtual Walkthroughs',
        'Interior Visualization',
        'Exterior Visualization',
        'Material Selection',
        'Lighting Simulation'
      ]
    },
    {
      title: 'Interior Design',
      description: 'Complete interior design and space planning solutions',
      features: [
        'Space Planning',
        'Material Selection',
        'Color Schemes',
        'Furniture Layout',
        'Lighting Design',
        'Custom Furniture Design'
      ]
    },
    {
      title: 'Bill of Quantities',
      description: 'Detailed cost estimation and quantity surveying',
      features: [
        'Material Quantities',
        'Labor Estimation',
        'Cost Analysis',
        'Project Scheduling',
        'Resource Planning',
        'Budget Management'
      ]
    },
    {
      title: 'Implementation Support',
      description: 'Professional construction supervision and support',
      features: [
        'Construction Supervision',
        'Quality Control',
        'Site Inspections',
        'Progress Monitoring',
        'Technical Support',
        'Project Coordination'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Our Design Services
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We offer comprehensive architectural and design services to bring your vision to life. 
            Our team of experts ensures quality and precision at every stage of your project.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-300"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {service.title}
              </h2>
              <p className="text-gray-600 mb-6">{service.description}</p>
              <ul className="space-y-3 mb-6">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-gray-600">
                    <svg 
                      className="w-5 h-5 mr-2 text-blue-500" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={handleRequestService}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center"
              >
                <span>Request Service</span>
                <svg 
                  className="w-5 h-5 ml-2" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/calculator"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            Try our Cost Calculator
            <svg 
              className="w-5 h-5 ml-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Services; 
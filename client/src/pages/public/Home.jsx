import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdFingerprint } from 'react-icons/md';

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [nextImageIndex, setNextImageIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const heroImages = [
    {
      url: '/images/modern-design.jpg',
      alt: 'Modern Architecture Design'
    },
    {
      url: '/images/luxury-apartment.jpg',
      alt: 'Luxury Apartment Interior'
    },
    {
      url: '/images/sustainable-design.jpg',
      alt: 'Sustainable Building Design'
    }
  ];

  // Auto-rotate images
  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
        setNextImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
        setIsTransitioning(false);
      }, 1000); // Match this with CSS transition duration
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="relative bg-white">
        {/* Hero Images */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImages[currentImageIndex].url}
            alt={heroImages[currentImageIndex].alt}
            className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${
              isTransitioning ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <img
            src={heroImages[nextImageIndex].url}
            alt={heroImages[nextImageIndex].alt}
            className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${
              isTransitioning ? 'opacity-100' : 'opacity-0'
            }`}
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 max-w-7xl">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-8">
              <MdFingerprint className="h-16 w-16 text-blue-600" />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Welcome to Ashara Building Design
            </h1>
            <p className="text-lg sm:text-xl text-gray-100 mb-10 max-w-2xl mx-auto">
              Transform your architectural vision into reality with our cutting-edge design solutions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/register"
                className="w-full sm:w-auto bg-gray-800 text-white px-8 py-4 rounded-lg hover:bg-gray-900 transition-colors text-center min-w-[200px]"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-12">
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <FeatureCard
              title="Custom Designs"
              description="Create your perfect space with our customizable design templates"
              icon="🏠"
            />
            <FeatureCard
              title="3D Visualization"
              description="Experience your design in immersive 3D before construction"
              icon="🎨"
            />
            <FeatureCard
              title="Expert Support"
              description="Get guidance from our experienced architectural team"
              icon="👥"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl text-white font-bold mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-white/90 mb-10 text-lg">
              Join us today and bring your architectural dreams to life
            </p>
            <Link
              to="/register"
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors min-w-[200px]"
            >
              Create Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ title, description, icon }) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center">
      <div className="text-5xl mb-6 flex justify-center">{icon}</div>
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">{title}</h3>
      <p className="text-gray-600 text-lg">{description}</p>
    </div>
  );
};

export default Home; 
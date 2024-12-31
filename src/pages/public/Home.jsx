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
      {/* Hero Section - Scaled down height */}
      <section className="relative bg-white">
        {/* Hero Images Container - Reduced height */}
        <div className="absolute inset-0 w-full h-[400px] md:h-[500px] overflow-hidden">
          <img
            src={heroImages[currentImageIndex].url}
            alt={heroImages[currentImageIndex].alt}
            className="w-full h-full object-cover transition-opacity duration-1000"
            style={{ opacity: isTransitioning ? 0 : 1 }}
          />
        </div>

        {/* Content Container - Adjusted height to match */}
        <div className="container-xl mx-auto relative z-10">
          <div className="flex flex-col items-center justify-center min-h-[400px] md:min-h-[500px] px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
                Design Your Dream Space
              </h1>
              <p className="text-sm sm:text-base text-white/90 mb-6 max-w-xl mx-auto">
                Transform your vision into reality with our innovative architectural design platform
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  to="/register"
                  className="w-full sm:w-auto bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors min-w-[160px]"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Adjusted padding */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="container-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
              Our Services
            </h2>
            <p className="text-base text-gray-600">
              Comprehensive architectural design solutions for your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Feature cards - Scaled down */}
            <FeatureCard
              title="Custom Designs"
              description="Tailored architectural solutions for your specific needs"
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

      {/* CTA Section - Adjusted padding */}
      <section className="bg-blue-600 py-12 lg:py-16">
        <div className="container-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl text-white font-bold mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="text-white/90 mb-8 text-base">
              Join us today and bring your architectural dreams to life
            </p>
            <Link
              to="/register"
              className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors min-w-[160px]"
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
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center">
      <div className="text-4xl mb-4 flex justify-center">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-800 mb-3">{title}</h3>
      <p className="text-gray-600 text-base">{description}</p>
    </div>
  );
};

export default Home; 
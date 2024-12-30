import { Link, useLocation } from 'react-router-dom';
import { MdFingerprint } from 'react-icons/md';
import { useState } from 'react';

function PublicNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  const navLinkClasses = (path) => `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200 ${
    isActivePath(path)
      ? 'border-blue-600 text-gray-900'
      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-900'
  }`;

  const mobileNavLinkClasses = (path) => `block pl-3 pr-4 py-2 text-base font-medium border-l-4 transition-colors duration-200 ${
    isActivePath(path)
      ? 'border-blue-600 text-blue-600 bg-blue-50'
      : 'border-transparent text-gray-700 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-900'
  }`;

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <MdFingerprint className="h-8 w-8 text-blue-600" />
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link to="/" className={navLinkClasses('/')}>
                Home
              </Link>
              <Link to="/services" className={navLinkClasses('/services')}>
                Services
              </Link>
              <Link to="/designcatalog" className={navLinkClasses('/designcatalog')}>
                Design Catalog
              </Link>
              <Link to="/calculator" className={navLinkClasses('/calculator')}>
                Calculator
              </Link>
              <Link to="/software" className={navLinkClasses('/software')}>
                Software
              </Link>
            </div>
          </div>
          <div className="hidden sm:flex items-center">
            <Link to="/login" className="text-sm font-medium text-gray-500 hover:text-gray-900 mr-4">
              Login
            </Link>
            <Link to="/register" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
              Register
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className={mobileNavLinkClasses('/')}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/services"
              className={mobileNavLinkClasses('/services')}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              to="/designcatalog"
              className={mobileNavLinkClasses('/designcatalog')}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Design Catalog
            </Link>
            <Link
              to="/calculator"
              className={mobileNavLinkClasses('/calculator')}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Calculator
            </Link>
            <Link
              to="/software"
              className={mobileNavLinkClasses('/software')}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Software
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="space-y-1">
              <Link
                to="/login"
                className="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default PublicNavbar; 
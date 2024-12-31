import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdFingerprint } from 'react-icons/md';

function ClientNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));

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

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/client/dashboard" className="flex-shrink-0 flex items-center">
              <MdFingerprint className="h-8 w-8 text-blue-600" />
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link to="/client/dashboard" className={navLinkClasses('/client/dashboard')}>
                Dashboard
              </Link>
              <Link to="/designcatalog" className={navLinkClasses('/designcatalog')}>
                Design Catalog
              </Link>
              <Link to="/request-design" className={navLinkClasses('/request-design')}>
                Request Design
              </Link>
              <Link to="/orders" className={navLinkClasses('/orders')}>
                My Orders
              </Link>
              <Link to="/calculator" className={navLinkClasses('/calculator')}>
                Calculator
              </Link>
            </div>
          </div>

          {/* Desktop Profile Menu */}
          <div className="hidden sm:flex items-center">
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2 text-sm font-medium text-gray-500 hover:text-gray-900"
              >
                <span>{user?.name}</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      Profile Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
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
              to="/client/dashboard"
              className={mobileNavLinkClasses('/client/dashboard')}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              to="/designcatalog"
              className={mobileNavLinkClasses('/designcatalog')}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Design Catalog
            </Link>
            <Link
              to="/request-design"
              className={mobileNavLinkClasses('/request-design')}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Request Design
            </Link>
            <Link
              to="/orders"
              className={mobileNavLinkClasses('/orders')}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              My Orders
            </Link>
            <Link
              to="/calculator"
              className={mobileNavLinkClasses('/calculator')}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Calculator
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-4">
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">{user?.name}</div>
              </div>
            </div>
            <div className="mt-3 space-y-1">
              <Link
                to="/profile"
                className="block px-4 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Profile Settings
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default ClientNavbar; 
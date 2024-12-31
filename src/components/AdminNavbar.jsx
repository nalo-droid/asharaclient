import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdFingerprint } from 'react-icons/md';

function AdminNavbar() {
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
            <Link to="/admin/dashboard" className="flex-shrink-0 flex items-center">
              <MdFingerprint className="h-8 w-8 text-blue-600" />
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link to="/admin/dashboard" className={navLinkClasses('/admin/dashboard')}>
                Dashboard
              </Link>
              <Link to="/admin/manage-designs" className={navLinkClasses('/admin/manage-designs')}>
                Design Requests
              </Link>
              <Link to="/admin/design-catalog" className={navLinkClasses('/admin/design-catalog')}>
                Design Catalog
              </Link>
              <Link to="/admin/create-design" className={navLinkClasses('/admin/create-design')}>
                Create Design
              </Link>
              <Link to="/admin/manage-users" className={navLinkClasses('/admin/manage-users')}>
                Manage Users
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
              to="/admin/dashboard"
              className={mobileNavLinkClasses('/admin/dashboard')}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              to="/admin/manage-designs"
              className={mobileNavLinkClasses('/admin/manage-designs')}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Design Requests
            </Link>
            <Link
              to="/admin/design-catalog"
              className={mobileNavLinkClasses('/admin/design-catalog')}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Design Catalog
            </Link>
            <Link
              to="/admin/create-design"
              className={mobileNavLinkClasses('/admin/create-design')}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Create Design
            </Link>
            <Link
              to="/admin/manage-users"
              className={mobileNavLinkClasses('/admin/manage-users')}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Manage Users
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-4">
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">{user?.name}</div>
              </div>
            </div>
            <div className="mt-3 space-y-1">
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

export default AdminNavbar; 
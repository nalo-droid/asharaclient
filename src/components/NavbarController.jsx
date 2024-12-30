import { useEffect, useState } from 'react';
import PublicNavbar from './PublicNavbar';
import ClientNavbar from './ClientNavbar';
import AdminNavbar from './AdminNavbar';

function NavbarController() {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setUserRole(user?.role || 'public');
  }, []);

  // Listen for changes in localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      const user = JSON.parse(localStorage.getItem('user'));
      setUserRole(user?.role || 'public');
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  switch (userRole) {
    case 'admin':
      return <AdminNavbar />;
    case 'client':
      return <ClientNavbar />;
    default:
      return <PublicNavbar />;
  }
}

export default NavbarController; 
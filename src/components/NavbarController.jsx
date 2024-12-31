import { useLocation } from 'react-router-dom';
import PublicNavbar from './PublicNavbar';
import AdminNavbar from './AdminNavbar';
import ClientNavbar from './ClientNavbar';

function NavbarController() {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user'));

  // Don't show navbar on login and register pages
  if (location.pathname === '/login' || location.pathname === '/register') {
    return null;
  }

  // Show admin navbar for admin users
  if (user?.role === 'admin') {
    return <AdminNavbar />;
  }

  // Show client navbar for logged-in clients
  if (user?.role === 'client') {
    return <ClientNavbar />;
  }

  // Show public navbar for non-logged in users
  return <PublicNavbar />;
}

export default NavbarController; 
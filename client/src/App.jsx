import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import NavbarController from './components/NavbarController'
import Calculator from './components/Calculator'
import Home from './pages/public/Home'
import Login from './pages/public/Login'
import Register from './pages/public/Register'
import Services from './pages/public/Services'
import Software from './pages/public/Software'
import Dashboard from './pages/client/Dashboard'
import DesignCatalog from './pages/client/DesignCatalog'
import CustomizeDesign from './pages/client/CustomizeDesign'
import OrderHistory from './pages/client/OrderHistory'
import Profile from './pages/client/Profile'
import Footer from './components/Footer'
import AdminDashboard from './pages/admin/AdminDashboard'
import ManageDesigns from './pages/admin/ManageDesigns'
import ManageUsers from './pages/admin/ManageUsers'

function App() {
  const user = JSON.parse(localStorage.getItem('user'));
  const isAuthenticated = !!user;

  // Helper function to check role
  const hasRole = (requiredRole) => {
    return isAuthenticated && user.role === requiredRole;
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <NavbarController />
        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/services" element={<Services />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/software" element={<Software />} />
            <Route path="/designcatalog" element={<DesignCatalog />} />

            {/* Client Routes */}
            <Route
              path="/client/dashboard"
              element={hasRole('client') ? <Dashboard /> : <Navigate to="/login" />}
            />
            <Route
              path="/customize/:designId"
              element={hasRole('client') ? <CustomizeDesign /> : <Navigate to="/login" />}
            />
            <Route
              path="/orders"
              element={hasRole('client') ? <OrderHistory /> : <Navigate to="/login" />}
            />

            {/* Admin Routes */}
            <Route
              path="/admin/dashboard"
              element={hasRole('admin') ? <AdminDashboard /> : <Navigate to="/login" />}
            />
            <Route
              path="/admin/manage-designs"
              element={hasRole('admin') ? <ManageDesigns /> : <Navigate to="/login" />}
            />
            <Route
              path="/admin/manage-users"
              element={hasRole('admin') ? <ManageUsers /> : <Navigate to="/login" />}
            />

            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
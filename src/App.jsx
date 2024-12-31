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
import RequestDesign from './pages/client/RequestDesign'
import OrderHistory from './pages/client/OrderHistory'
import Profile from './pages/client/Profile'
import Footer from './components/Footer'
import AdminDashboard from './pages/admin/AdminDashboard'
import ManageDesigns from './pages/admin/ManageDesigns'
import ManageUsers from './pages/admin/ManageUsers'
import ManageDesignCatalog from './pages/admin/ManageDesignCatalog'
import CreateDesign from './pages/admin/CreateDesign'

function App() {
  const user = JSON.parse(localStorage.getItem('user'));
  const isAuthenticated = !!user;

  // Helper function to check role
  const hasRole = (requiredRole) => {
    return isAuthenticated && user.role === requiredRole;
  };

  // Helper function to protect routes
  const ProtectedRoute = ({ element, requiredRole }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }
    if (requiredRole && user.role !== requiredRole) {
      return <Navigate to="/" />;
    }
    return element;
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
              element={<ProtectedRoute element={<Dashboard />} requiredRole="client" />}
            />
            <Route
              path="/request-design"
              element={<ProtectedRoute element={<RequestDesign />} requiredRole="client" />}
            />
            <Route
              path="/orders"
              element={<ProtectedRoute element={<OrderHistory />} requiredRole="client" />}
            />
            <Route
              path="/profile"
              element={<ProtectedRoute element={<Profile />} requiredRole="client" />}
            />

            {/* Admin Routes */}
            <Route
              path="/admin/dashboard"
              element={<ProtectedRoute element={<AdminDashboard />} requiredRole="admin" />}
            />
            <Route
              path="/admin/manage-designs"
              element={<ProtectedRoute element={<ManageDesigns />} requiredRole="admin" />}
            />
            <Route
              path="/admin/design-catalog"
              element={<ProtectedRoute element={<ManageDesignCatalog />} requiredRole="admin" />}
            />
            <Route
              path="/admin/create-design"
              element={<ProtectedRoute element={<CreateDesign />} requiredRole="admin" />}
            />
            <Route
              path="/admin/manage-users"
              element={<ProtectedRoute element={<ManageUsers />} requiredRole="admin" />}
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
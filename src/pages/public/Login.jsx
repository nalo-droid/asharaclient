import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdFingerprint } from 'react-icons/md';
import { testUsers } from '../../utils/testUsers';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Find user in testUsers
    const user = testUsers.find(
      user => user.email === formData.email && user.password === formData.password
    );

    if (user) {
      // Store user info in localStorage
      localStorage.setItem('user', JSON.stringify({
        name: user.name,
        email: user.email,
        role: user.role
      }));

      // Custom event to notify NavbarController
      window.dispatchEvent(new Event('storage'));

      // Redirect based on role
      if (user.role === 'admin') {
        navigate('/admin/dashboard');
      } else if (user.role === 'client') {
        navigate('/client/dashboard');
      }
    } else {
      setError('Invalid email or password');
    }
  };

  // For debugging - remove in production
  const loginAsTestUser = (role) => {
    const testUser = testUsers.find(user => user.role === role);
    if (testUser) {
      setFormData({
        email: testUser.email,
        password: testUser.password
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="flex justify-center">
            <MdFingerprint className="h-12 w-12 text-blue-600" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          {error && (
            <p className="mt-2 text-center text-sm text-red-600">
              {error}
            </p>
          )}
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign in
            </button>
          </div>
        </form>

        {/* Test Credentials */}
        <div className="mt-4 text-sm text-gray-600">
          <p className="font-semibold">Test Credentials:</p>
          <div className="mt-2 space-y-2">
            <button
              onClick={() => loginAsTestUser('client')}
              className="block w-full text-left px-3 py-2 hover:bg-gray-100 rounded"
            >
              Client: client@test.com / client123
            </button>
            <button
              onClick={() => loginAsTestUser('admin')}
              className="block w-full text-left px-3 py-2 hover:bg-gray-100 rounded"
            >
              Admin: admin@test.com / admin123
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login; 
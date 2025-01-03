import { useState, useEffect } from 'react';
import apiUrl from '../../utils/apiUrl';

const RequestDesign = () => {
  const [formData, setFormData] = useState({
    plotArea: '',
    designType: '',
    description: '',
    sketch: null,
    titleDeed: null,
    fullName: '',
    contactNumber: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    console.log('RequestDesign component mounted');
  }, []);

  const handleInputChange = (e) => {
    console.log('Input changed:', e.target.name, e.target.value);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const handleFileChange = (e) => {
    console.log('File changed:', e.target.name, e.target.files[0]?.name);
    setFormData({
      ...formData,
      [e.target.name]: e.target.files[0]
    });
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    console.log('Validating form with data:', formData);

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.contactNumber.trim()) newErrors.contactNumber = 'Contact number is required';
    if (!formData.plotArea) newErrors.plotArea = 'Plot area is required';
    if (!formData.designType) newErrors.designType = 'Design type is required';
    if (!formData.titleDeed) newErrors.titleDeed = 'Title deed is required';

    console.log('Validation errors:', newErrors);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submit button clicked');
    setMessage('');
    
    if (!validateForm()) {
      console.log('Form validation failed');
      setMessage('Please fill in all required fields');
      return;
    }

    setLoading(true);
    console.log('Form validation passed, proceeding with submission');
    
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('fullName', formData.fullName);
      formDataToSend.append('contactNumber', formData.contactNumber);
      formDataToSend.append('plotArea', formData.plotArea);
      formDataToSend.append('designType', formData.designType);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('titleDeed', formData.titleDeed);
      if (formData.sketch) {
        formDataToSend.append('sketch', formData.sketch);
      }

      const token = localStorage.getItem('token');
      console.log('Token present:', !!token);
      console.log('Sending request to:', `${apiUrl}/api/design-requests`);

      const response = await fetch(`${apiUrl}/api/design-requests`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formDataToSend,
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit design request');
      }

      setFormData({
        plotArea: '',
        designType: '',
        description: '',
        sketch: null,
        titleDeed: null,
        fullName: '',
        contactNumber: ''
      });
      
      document.querySelectorAll('input[type="file"]').forEach(input => {
        input.value = '';
      });
      
      setMessage('Design request submitted successfully!');
      console.log('Submission successful');

      setTimeout(() => {
        console.log('Redirecting to order history...');
        window.location.href = '/order-history';
      }, 2000);

    } catch (error) {
      console.error('Submission error:', error);
      setMessage(error.message || 'Error submitting request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Request a Design</h1>
        
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <div className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.fullName ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.fullName && (
                  <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Number *
                </label>
                <input
                  type="tel"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.contactNumber ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.contactNumber && (
                  <p className="mt-1 text-sm text-red-600">{errors.contactNumber}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Plot Area (in m²) *
              </label>
              <select
                name="plotArea"
                value={formData.plotArea}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.plotArea ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">select an option</option>
                <option value="100-200">100-200 m²</option>
                <option value="201-300">201-300 m²</option>
                <option value="301-400">301-400 m²</option>
                <option value="401+">401+ m²</option>
              </select>
              {errors.plotArea && (
                <p className="mt-1 text-sm text-red-600">{errors.plotArea}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Design Type *
              </label>
              <select
                name="designType"
                value={formData.designType}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.designType ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">select an option</option>
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
                <option value="industrial">Industrial</option>
              </select>
              {errors.designType && (
                <p className="mt-1 text-sm text-red-600">{errors.designType}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Example: Wide Living area with modern kitchen, master bedroom with bath and closet..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Do you have a sketch?
              </label>
              <input
                type="file"
                name="sketch"
                onChange={handleFileChange}
                className="w-full"
                accept="image/*,.pdf"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title deed certificate (NEC) *
              </label>
              <input
                type="file"
                name="titleDeed"
                onChange={handleFileChange}
                className={`w-full ${errors.titleDeed ? 'border-red-500' : ''}`}
                accept=".pdf"
              />
              {errors.titleDeed && (
                <p className="mt-1 text-sm text-red-600">{errors.titleDeed}</p>
              )}
            </div>

            {message && (
              <div 
                className={`p-3 rounded-md ${
                  message.includes('Error') || message.includes('Please fill') 
                    ? 'bg-red-100 text-red-700' 
                    : 'bg-green-100 text-green-700'
                }`}
              >
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-blue-300 transition-colors"
            >
              {loading ? 'Submitting...' : 'Submit Request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestDesign; 
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

function CustomizeDesign() {
  const { designId } = useParams();
  const [activeTab, setActiveTab] = useState('customize'); // 'customize' or 'request'
  const [customizations, setCustomizations] = useState({
    materials: '',
    colors: '',
    dimensions: '',
    additionalNotes: ''
  });
  
  const [requestForm, setRequestForm] = useState({
    projectType: '',
    location: '',
    budget: '',
    timeline: '',
    drawings: null,
    requirements: '',
    boqNeeded: false
  });

  const handleCustomizationChange = (e) => {
    setCustomizations({
      ...customizations,
      [e.target.name]: e.target.value
    });
  };

  const handleRequestChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setRequestForm({
      ...requestForm,
      [e.target.name]: value
    });
  };

  const handleFileChange = (e) => {
    setRequestForm({
      ...requestForm,
      drawings: e.target.files[0]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Request Form:', requestForm);
    // You would typically send this to your backend
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Design Request</h1>

      {/* Tab Navigation */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('customize')}
            className={`${
              activeTab === 'customize'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Customize Design
          </button>
          <button
            onClick={() => setActiveTab('request')}
            className={`${
              activeTab === 'request'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Submit Request
          </button>
        </nav>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Design Preview */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Design Preview</h2>
          <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg mb-4">
            {/* Design preview image */}
          </div>
          <div className="space-y-2">
            <p className="text-gray-600">Design ID: {designId}</p>
          </div>
        </div>

        {/* Forms Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          {activeTab === 'customize' ? (
            // Customization Form
            <div>
              <h2 className="text-xl font-semibold mb-4">Customization Options</h2>
              {/* Original customization form content */}
            </div>
          ) : (
            // Request Form
            <div>
              <h2 className="text-xl font-semibold mb-4">Design Request Form</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Project Type
                  </label>
                  <select
                    name="projectType"
                    value={requestForm.projectType}
                    onChange={handleRequestChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  >
                    <option value="">Select Project Type</option>
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                    <option value="industrial">Industrial</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={requestForm.location}
                    onChange={handleRequestChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Budget Range
                  </label>
                  <input
                    type="text"
                    name="budget"
                    value={requestForm.budget}
                    onChange={handleRequestChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expected Timeline
                  </label>
                  <input
                    type="text"
                    name="timeline"
                    value={requestForm.timeline}
                    onChange={handleRequestChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Upload Drawings/Sketches
                  </label>
                  <input
                    type="file"
                    name="drawings"
                    onChange={handleFileChange}
                    className="w-full"
                    accept=".pdf,.dwg,.dxf,.jpg,.png"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Accepted formats: PDF, DWG, DXF, JPG, PNG
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Special Requirements
                  </label>
                  <textarea
                    name="requirements"
                    value={requestForm.requirements}
                    onChange={handleRequestChange}
                    rows="4"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  ></textarea>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="boqNeeded"
                    checked={requestForm.boqNeeded}
                    onChange={handleRequestChange}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                  <label className="ml-2 text-sm text-gray-700">
                    Include BOQ (Bill of Quantities) Request
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                >
                  Submit Request
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CustomizeDesign; 
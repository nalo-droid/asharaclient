import React, { useState, useEffect } from 'react';
import apiUrl from '../../utils/apiUrl';
import { format } from 'date-fns';

function OrderHistory() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/design-requests/my-requests`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch requests');
      }

      setRequests(data.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      'in-progress': 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const openModal = (request) => {
    setSelectedRequest(request);
    setShowModal(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-600 text-center">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">Design Requests History</h1>

        {requests.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
            <p className="text-gray-600 text-center">No requests found</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow">
            <div className="overflow-x-auto">
              <div className="inline-block min-w-full align-middle px-2 sm:px-4">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Request Details
                      </th>
                      <th className="hidden sm:table-cell px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Design Type
                      </th>
                      <th className="hidden md:table-cell px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Plot Area
                      </th>
                      <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {requests.map((request) => (
                      <tr key={request._id}>
                        <td className="px-3 sm:px-6 py-4">
                          <div className="text-xs sm:text-sm font-medium text-gray-900">
                            Request #{request._id.slice(-6)}
                          </div>
                          <div className="text-xs sm:text-sm text-gray-500">
                            {format(new Date(request.createdAt), 'MMM dd, yyyy')}
                          </div>
                          <div className="sm:hidden text-xs text-gray-500 mt-1">
                            {request.designType}
                          </div>
                          <div className="md:hidden text-xs text-gray-500">
                            {request.plotArea}
                          </div>
                        </td>
                        <td className="hidden sm:table-cell px-3 sm:px-6 py-4">
                          <div className="text-sm text-gray-900">{request.designType}</div>
                        </td>
                        <td className="hidden md:table-cell px-3 sm:px-6 py-4">
                          <div className="text-sm text-gray-900">{request.plotArea}</div>
                        </td>
                        <td className="px-3 sm:px-6 py-4">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(request.status)}`}>
                            {request.status}
                          </span>
                        </td>
                        <td className="px-3 sm:px-6 py-4">
                          <button
                            onClick={() => openModal(request)}
                            className="text-blue-600 hover:text-blue-900 text-sm"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {showModal && selectedRequest && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-4 sm:p-6 max-w-sm sm:max-w-md w-full max-h-[90vh] overflow-y-auto">
              <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-4">
                Design Request Details
              </h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-xs sm:text-sm font-medium text-gray-500">Request Information</h4>
                    <p className="text-xs sm:text-sm text-gray-900">
                      Request #{selectedRequest._id.slice(-6)}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-900">
                      Submitted on: {format(new Date(selectedRequest.createdAt), 'MMM dd, yyyy')}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs sm:text-sm font-medium text-gray-500">Design Details</h4>
                    <p className="text-xs sm:text-sm text-gray-900">Type: {selectedRequest.designType}</p>
                    <p className="text-xs sm:text-sm text-gray-900">Plot Area: {selectedRequest.plotArea}</p>
                  </div>
                </div>

                {selectedRequest.description && (
                  <div>
                    <h4 className="text-xs sm:text-sm font-medium text-gray-500">Description</h4>
                    <p className="text-xs sm:text-sm text-gray-900">{selectedRequest.description}</p>
                  </div>
                )}

                <div>
                  <h4 className="text-xs sm:text-sm font-medium text-gray-500">Documents</h4>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-2">
                    <a
                      href={`${apiUrl}/${selectedRequest.titleDeedPath}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      View Title Deed
                    </a>
                    {selectedRequest.sketchPath && (
                      <a
                        href={`${apiUrl}/${selectedRequest.sketchPath}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        View Sketch
                      </a>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs sm:text-sm font-medium text-gray-500">Status</h4>
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(selectedRequest.status)}`}>
                    {selectedRequest.status}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setShowModal(false)}
                className="mt-6 w-full inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-xs sm:text-sm font-medium text-blue-900 hover:bg-blue-200"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderHistory; 
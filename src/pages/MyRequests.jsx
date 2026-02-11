import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyRequests, updateRequestStatus, cancelRequest } from '../store/requestSlice';
import { FaFilter, FaCheck, FaTimes, FaHourglass } from 'react-icons/fa';

function MyRequests() {
  const dispatch = useDispatch();
  const [requests, setRequests] = useState([]);
  const [filters, setFilters] = useState({ type: '', status: '' });
  const { loading } = useSelector((state) => state.requests);

  useEffect(() => {
    loadRequests();
  }, [filters]);

  const loadRequests = async () => {
    try {
      const response = await dispatch(getMyRequests(filters));
      setRequests(response.requests || []);
    } catch (error) {
      console.error('Error loading requests:', error);
    }
  };

  const handleStatusUpdate = async (requestId, newStatus) => {
    try {
      await dispatch(updateRequestStatus(requestId, newStatus));
      loadRequests();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleCancel = async (requestId) => {
    if (window.confirm('Are you sure you want to cancel this request?')) {
      try {
        await dispatch(cancelRequest(requestId));
        loadRequests();
      } catch (error) {
        console.error('Error canceling request:', error);
      }
    }
  };

  const statusBadge = (status) => {
    const colors = {
      Pending: 'bg-yellow-100 text-yellow-800',
      Accepted: 'bg-green-100 text-green-800',
      Rejected: 'bg-red-100 text-red-800',
      Completed: 'bg-blue-100 text-blue-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <h1 className="text-4xl font-bold text-gray-900 mb-8">My Requests</h1>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <FaFilter /> <span className="font-semibold">Filters</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            className="input"
          >
            <option value="">All Requests</option>
            <option value="sent">Sent by Me</option>
            <option value="received">Received</option>
          </select>
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="input"
          >
            <option value="">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Accepted">Accepted</option>
            <option value="Rejected">Rejected</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Requests List */}
      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-600">Loading requests...</p>
        </div>
      ) : requests.length > 0 ? (
        <div className="space-y-4">
          {requests.map((request) => (
            <div key={request._id} className="card p-6 hover:shadow-lg transition-shadow">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                {/* Skill Info */}
                <div>
                  <h3 className="font-bold text-gray-900">{request.skillId?.title}</h3>
                  <p className="text-sm text-gray-600">{request.skillId?.category}</p>
                </div>

                {/* User Info */}
                <div>
                  <p className="text-sm font-semibold text-gray-700">
                    {filters.type === 'sent' ? 'To: ' : 'From: '}
                    {filters.type === 'sent'
                      ? request.toUserId?.name
                      : request.fromUserId?.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {filters.type === 'sent'
                      ? request.toUserId?.email
                      : request.fromUserId?.email}
                  </p>
                </div>

                {/* Status */}
                <div>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusBadge(request.status)}`}>
                    {request.status}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2 justify-end">
                  {request.status === 'Pending' && filters.type === 'received' && (
                    <>
                      <button
                        onClick={() => handleStatusUpdate(request._id, 'Accepted')}
                        className="flex items-center space-x-1 text-green-600 hover:text-green-800 font-semibold text-sm"
                      >
                        <FaCheck /> Accept
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(request._id, 'Rejected')}
                        className="flex items-center space-x-1 text-red-600 hover:text-red-800 font-semibold text-sm"
                      >
                        <FaTimes /> Reject
                      </button>
                    </>
                  )}

                  {request.status === 'Accepted' && filters.type === 'sent' && (
                    <button
                      onClick={() => handleStatusUpdate(request._id, 'Completed')}
                      className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 font-semibold text-sm"
                    >
                      <FaCheck /> Mark Complete
                    </button>
                  )}

                  {request.status === 'Pending' && filters.type === 'sent' && (
                    <button
                      onClick={() => handleCancel(request._id)}
                      className="flex items-center space-x-1 text-red-600 hover:text-red-800 font-semibold text-sm"
                    >
                      <FaTimes /> Cancel
                    </button>
                  )}
                </div>
              </div>

              {/* Message */}
              {request.message && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Message: </span>{request.message}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <FaHourglass className="text-4xl text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600">No requests found</p>
        </div>
      )}
    </div>
  );
}

export default MyRequests;

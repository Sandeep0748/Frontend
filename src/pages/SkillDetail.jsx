import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getSkillById } from '../store/skillSlice';
import { createRequest } from '../store/requestSlice';
import { FaArrowLeft, FaCalendar, FaClock, FaStar } from 'react-icons/fa';

function SkillDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [skill, setSkill] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [requesting, setRequesting] = useState(false);

  useEffect(() => {
    loadSkill();
  }, [id]);

  const loadSkill = async () => {
    try {
      setLoading(true);
      const response = await dispatch(getSkillById(id));
      setSkill(response.skill);
    } catch (error) {
      console.error('Error loading skill:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRequestSkill = async () => {
    try {
      setRequesting(true);
      await dispatch(
        createRequest({
          skillId: id,
          message,
        })
      );
      navigate('/my-requests');
    } catch (error) {
      console.error('Error requesting skill:', error);
      alert(error.message || 'Failed to request skill');
    } finally {
      setRequesting(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <p className="text-gray-600">Loading skill details...</p>
      </div>
    );
  }

  if (!skill) {
    return (
      <div className="container mx-auto px-4 py-12">
        <p className="text-gray-600">Skill not found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 mb-8"
      >
        <FaArrowLeft /> <span>Back</span>
      </button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Skill Information */}
        <div className="md:col-span-2">
          <div className="card p-8">
            {/* Header */}
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{skill.title}</h1>
            <div className="flex items-center space-x-4 mb-6">
              <span className="px-4 py-2 bg-indigo-100 text-indigo-800 rounded-full font-semibold">
                {skill.category}
              </span>
              <span className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full font-semibold">
                {skill.experienceLevel}
              </span>
            </div>

            {/* Instructor */}
            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <h3 className="font-semibold text-gray-900 mb-2">Instructor</h3>
              <p className="text-lg text-gray-700 font-semibold">{skill.userId?.name}</p>
              <p className="text-gray-600">{skill.userId?.email}</p>
              {skill.userId?.phone && (
                <p className="text-gray-600">{skill.userId?.phone}</p>
              )}
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">About This Skill</h3>
              <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                {skill.description}
              </p>
            </div>

            {/* Availability */}
            {skill.availability?.days && skill.availability.days.length > 0 && (
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Availability</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="flex items-center space-x-2 text-gray-700 mb-2">
                      <FaCalendar /> <span className="font-semibold">Available Days</span>
                    </p>
                    <p className="text-gray-600">{skill.availability.days.join(', ')}</p>
                  </div>
                  {skill.availability.timeSlots && skill.availability.timeSlots.length > 0 && (
                    <div>
                      <p className="flex items-center space-x-2 text-gray-700 mb-2">
                        <FaClock /> <span className="font-semibold">Time Slots</span>
                      </p>
                      <p className="text-gray-600">{skill.availability.timeSlots.join(', ')}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Request Form */}
        <div>
          <div className="card p-8 sticky top-20">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Request This Skill</h2>

            {/* Message */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message (Optional)
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell the instructor why you want to learn this skill..."
                rows="4"
                className="input resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              onClick={handleRequestSkill}
              disabled={requesting}
              className="btn-primary w-full disabled:opacity-50"
            >
              {requesting ? 'Sending Request...' : 'Request Skill'}
            </button>

            {/* Info */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                <FaStar className="inline mr-2 text-yellow-500" />
                The instructor will review your request and respond within 24 hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SkillDetail;

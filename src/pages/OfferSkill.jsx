import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createSkill } from '../store/skillSlice';
import { FaArrowLeft } from 'react-icons/fa';

function OfferSkill() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.skills);

  const [formData, setFormData] = useState({
    category: '',
    title: '',
    description: '',
    experienceLevel: 'Beginner',
    days: [],
    timeSlots: [],
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const categories = ['Programming', 'Design', 'Teaching', 'Photography', 'Fitness', 'Music', 'Other'];
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const timeSlots = ['09:00-11:00', '11:00-13:00', '13:00-15:00', '15:00-17:00', '17:00-19:00'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDayChange = (day) => {
    setFormData((prev) => ({
      ...prev,
      days: prev.days.includes(day)
        ? prev.days.filter((d) => d !== day)
        : [...prev.days, day],
    }));
  };

  const handleTimeSlotChange = (slot) => {
    setFormData((prev) => ({
      ...prev,
      timeSlots: prev.timeSlots.includes(slot)
        ? prev.timeSlots.filter((s) => s !== slot)
        : [...prev.timeSlots, slot],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.category || !formData.title || !formData.description) {
      setError('Please fill in all required fields');
      return;
    }

    if (formData.title.length < 3) {
      setError('Title must be at least 3 characters');
      return;
    }

    if (formData.description.length < 10) {
      setError('Description must be at least 10 characters');
      return;
    }

    try {
      await dispatch(
        createSkill({
          category: formData.category,
          title: formData.title,
          description: formData.description,
          experienceLevel: formData.experienceLevel,
          availability: {
            days: formData.days,
            timeSlots: formData.timeSlots,
          },
        })
      );
      setSuccess('Skill created successfully!');
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      setError(err.message || 'Failed to create skill');
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 mb-8"
      >
        <FaArrowLeft /> <span>Back</span>
      </button>

      <div className="max-w-2xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Offer a Skill</h1>
        <p className="text-xl text-gray-600 mb-8">
          Share your expertise and help others learn
        </p>

        {/* Messages */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
            {success}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8 space-y-6">
          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="input"
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Skill Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="input"
              placeholder="e.g., Python Basics"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="6"
              className="input resize-none"
              placeholder="Describe what you'll teach, what students will learn, etc."
            />
          </div>

          {/* Experience Level */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Experience Level *
            </label>
            <select
              name="experienceLevel"
              value={formData.experienceLevel}
              onChange={handleChange}
              className="input"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Expert">Expert</option>
            </select>
          </div>

          {/* Availability - Days */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Available Days
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {days.map((day) => (
                <label key={day} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.days.includes(day)}
                    onChange={() => handleDayChange(day)}
                    className="w-4 h-4 text-indigo-600"
                  />
                  <span className="text-gray-700">{day}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Availability - Time Slots */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Available Time Slots
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {timeSlots.map((slot) => (
                <label key={slot} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.timeSlots.includes(slot)}
                    onChange={() => handleTimeSlotChange(slot)}
                    className="w-4 h-4 text-indigo-600"
                  />
                  <span className="text-gray-700">{slot}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full disabled:opacity-50"
          >
            {loading ? 'Creating Skill...' : 'Create Skill'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default OfferSkill;

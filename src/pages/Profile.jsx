import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile, updateProfile } from '../store/authSlice';
import { getUserSkills } from '../store/skillSlice';
import { FaUser, FaEdit, FaCheckCircle } from 'react-icons/fa';

function Profile() {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);
  const [isEditing, setIsEditing] = useState(false);
  const [skills, setSkills] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    bio: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadProfileData();
  }, []);

  const loadProfileData = async () => {
    try {
      const profileResponse = await dispatch(getProfile());
      setFormData({
        name: profileResponse.user?.name || '',
        email: profileResponse.user?.email || '',
        phone: profileResponse.user?.phone || '',
        bio: profileResponse.user?.bio || '',
      });

      if (profileResponse.user?._id) {
        const skillsResponse = await dispatch(getUserSkills(profileResponse.user._id));
        setSkills(skillsResponse.skills || []);
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      setError('');
      setSuccess('');

      if (!formData.name || !formData.phone) {
        setError('Name and phone are required');
        return;
      }

      await dispatch(
        updateProfile({
          name: formData.name,
          phone: formData.phone,
          bio: formData.bio,
        })
      );

      setSuccess('Profile updated successfully!');
      setIsEditing(false);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message || 'Failed to update profile');
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">My Profile</h1>

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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Information */}
        <div className="md:col-span-2">
          <div className="card p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
                <FaUser /> <span>Profile Information</span>
              </h2>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="btn-secondary text-sm flex items-center space-x-1"
              >
                <FaEdit /> {isEditing ? 'Cancel' : 'Edit'}
              </button>
            </div>

            {isEditing ? (
              <div className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="input"
                  />
                </div>

                {/* Email (Read-only) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email (Cannot be changed)
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    disabled
                    className="input bg-gray-100"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="input"
                  />
                </div>

                {/* Bio */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bio
                  </label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows="4"
                    className="input resize-none"
                    placeholder="Tell others about yourself..."
                  />
                </div>

                {/* Save Button */}
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="btn-primary w-full disabled:opacity-50"
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Name */}
                <div>
                  <label className="text-sm font-medium text-gray-700">Full Name</label>
                  <p className="text-lg text-gray-900">{formData.name}</p>
                </div>

                {/* Email */}
                <div>
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <p className="text-lg text-gray-900">{formData.email}</p>
                </div>

                {/* Phone */}
                <div>
                  <label className="text-sm font-medium text-gray-700">Phone Number</label>
                  <p className="text-lg text-gray-900">{formData.phone}</p>
                </div>

                {/* Bio */}
                {formData.bio && (
                  <div>
                    <label className="text-sm font-medium text-gray-700">Bio</label>
                    <p className="text-gray-900">{formData.bio}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="space-y-6">
          <div className="card p-8 text-center">
            <p className="text-gray-600 text-sm mb-2">Skills Offered</p>
            <p className="text-4xl font-bold text-indigo-600">{skills.length}</p>
          </div>

          <div className="card p-8 text-center">
            <p className="text-gray-600 text-sm mb-2">Account Status</p>
            <p className="text-lg font-bold text-green-600 flex items-center justify-center space-x-2">
              <FaCheckCircle /> Active
            </p>
          </div>
        </div>
      </div>

      {/* Skills Section */}
      {skills.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill) => (
              <div key={skill._id} className="card p-6">
                <h3 className="font-bold text-lg text-gray-900 mb-2">{skill.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{skill.category}</p>
                <p className="text-gray-700 text-sm mb-4">{skill.description.substring(0, 100)}...</p>
                <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs font-semibold">
                  {skill.experienceLevel}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;

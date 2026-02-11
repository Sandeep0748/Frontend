import { Link } from 'react-router-dom';
import { FaStar, FaCalendar, FaClock } from 'react-icons/fa';

function SkillCard({ skill }) {
  const experienceLevelColor = {
    Beginner: 'bg-green-100 text-green-800',
    Intermediate: 'bg-yellow-100 text-yellow-800',
    Expert: 'bg-red-100 text-red-800',
  };

  return (
    <Link to={`/skill/${skill._id}`}>
      <div className="card p-6 h-full hover:shadow-xl cursor-pointer transform hover:-translate-y-2 transition-all">
        {/* Header */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-800 mb-2">{skill.title}</h3>
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-600 text-sm">{skill.category}</span>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${experienceLevelColor[skill.experienceLevel]}`}>
              {skill.experienceLevel}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {skill.description}
        </p>

        {/* User Info */}
        <div className="bg-gray-50 p-3 rounded-lg mb-4">
          <p className="text-sm font-semibold text-gray-800">
            {skill.userId?.name || 'Anonymous'}
          </p>
          <p className="text-xs text-gray-500">{skill.userId?.email}</p>
        </div>

        {/* Availability */}
        {skill.availability?.days && skill.availability.days.length > 0 && (
          <div className="text-xs text-gray-600">
            <p className="flex items-center space-x-2 mb-1">
              <FaCalendar /> <span>Available: {skill.availability.days.join(', ')}</span>
            </p>
            {skill.availability.timeSlots && (
              <p className="flex items-center space-x-2">
                <FaClock /> <span>{skill.availability.timeSlots[0]}</span>
              </p>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
          <span className="text-indigo-600 font-semibold text-sm">View Details →</span>
          <div className="flex items-center space-x-1 text-yellow-500">
            <FaStar size={12} />
            <span className="text-xs text-gray-600">New</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default SkillCard;

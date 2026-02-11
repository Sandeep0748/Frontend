import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/authSlice';
import { FaHome, FaSearch, FaPlus, FaBell, FaUser, FaSignOutAlt } from 'react-icons/fa';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-indigo-600">
            SkillLoop
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-6">
            <Link
              to="/"
              className="flex items-center space-x-1 text-gray-600 hover:text-indigo-600"
            >
              <FaHome /> <span>Dashboard</span>
            </Link>
            <Link
              to="/explore"
              className="flex items-center space-x-1 text-gray-600 hover:text-indigo-600"
            >
              <FaSearch /> <span>Explore</span>
            </Link>
            <Link
              to="/offer-skill"
              className="flex items-center space-x-1 text-gray-600 hover:text-indigo-600"
            >
              <FaPlus /> <span>Offer Skill</span>
            </Link>
            <Link
              to="/my-requests"
              className="flex items-center space-x-1 text-gray-600 hover:text-indigo-600"
            >
              <FaBell /> <span>Requests</span>
            </Link>
          </nav>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <Link
              to="/profile"
              className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600"
            >
              <FaUser /> <span className="hidden sm:inline">{user?.name || 'Profile'}</span>
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1 text-red-600 hover:text-red-800"
            >
              <FaSignOutAlt /> <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProfile } from '../store/authSlice';
import { getAllSkills } from '../store/skillSlice';
import SkillCard from '../components/SkillCard';
import { FaPlus, FaBookmark, FaCheckCircle } from 'react-icons/fa';

function Dashboard() {
  const dispatch = useDispatch();
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        await dispatch(getProfile());
        const skillsResponse = await dispatch(getAllSkills());
        setSkills(skillsResponse.skills || []);
      } catch (error) {
        console.error('Error loading dashboard:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [dispatch]);

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Welcome Section */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-xl text-gray-600">
          Ready to learn new skills or share your expertise?
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Link to="/offer-skill">
          <div className="card p-6 hover:shadow-xl cursor-pointer">
            <FaPlus className="text-3xl text-indigo-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">Offer a Skill</h3>
            <p className="text-gray-600">Share your expertise with others</p>
          </div>
        </Link>

        <Link to="/explore">
          <div className="card p-6 hover:shadow-xl cursor-pointer">
            <FaBookmark className="text-3xl text-purple-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">Explore Skills</h3>
            <p className="text-gray-600">Discover skills to learn</p>
          </div>
        </Link>

        <Link to="/my-requests">
          <div className="card p-6 hover:shadow-xl cursor-pointer">
            <FaCheckCircle className="text-3xl text-green-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">My Requests</h3>
            <p className="text-gray-600">Manage your skill requests</p>
          </div>
        </Link>
      </div>

      {/* Featured Skills */}
      <section>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Featured Skills</h2>
          <Link to="/explore" className="text-indigo-600 font-semibold hover:text-indigo-700">
            View All →
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading skills...</p>
          </div>
        ) : skills.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.slice(0, 6).map((skill) => (
              <SkillCard key={skill._id} skill={skill} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">No skills available yet</p>
            <Link to="/offer-skill" className="btn-primary inline-block">
              Be the first to offer a skill
            </Link>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="mt-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-12 text-white">
        <h2 className="text-3xl font-bold mb-4">Start Your Learning Journey</h2>
        <p className="text-lg mb-6">
          Join thousands of people exchanging skills and growing together.
        </p>
        <Link to="/explore" className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 inline-block">
          Explore Skills Now
        </Link>
      </section>
    </div>
  );
}

export default Dashboard;

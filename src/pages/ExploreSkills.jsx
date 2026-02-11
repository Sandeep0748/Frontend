import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSkills, searchSkills } from '../store/skillSlice';
import SkillCard from '../components/SkillCard';
import { FaSearch, FaFilter } from 'react-icons/fa';

function ExploreSkills() {
  const dispatch = useDispatch();
  const [skills, setSkills] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    experienceLevel: '',
  });
  const [searchQuery, setSearchQuery] = useState('');
  const { loading } = useSelector((state) => state.skills);

  useEffect(() => {
    loadSkills();
  }, [filters]);

  const loadSkills = async () => {
    try {
      const response = await dispatch(getAllSkills(filters));
      setSkills(response.skills || []);
    } catch (error) {
      console.error('Error loading skills:', error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      loadSkills();
      return;
    }

    try {
      const response = await dispatch(searchSkills(searchQuery));
      setSkills(response.skills || []);
    } catch (error) {
      console.error('Error searching skills:', error);
    }
  };

  const categories = ['Programming', 'Design', 'Teaching', 'Photography', 'Fitness', 'Music'];
  const experienceLevels = ['Beginner', 'Intermediate', 'Expert'];

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Explore Skills</h1>
        <p className="text-xl text-gray-600">Discover and request skills from our community</p>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        {/* Search */}
        <form onSubmit={handleSearch} className="mb-6">
          <div className="relative">
            <FaSearch className="absolute left-4 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input pl-12 w-full"
            />
            <button type="submit" className="btn-primary absolute right-2 top-2">
              Search
            </button>
          </div>
        </form>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <FaFilter className="mr-2" /> Category
            </label>
            <select
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              className="input"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Experience Level Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Experience Level
            </label>
            <select
              value={filters.experienceLevel}
              onChange={(e) => setFilters({ ...filters, experienceLevel: e.target.value })}
              className="input"
            >
              <option value="">All Levels</option>
              {experienceLevels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Clear Filters */}
        {(filters.category || filters.experienceLevel || searchQuery) && (
          <button
            onClick={() => {
              setFilters({ category: '', experienceLevel: '' });
              setSearchQuery('');
              loadSkills();
            }}
            className="mt-4 text-indigo-600 font-semibold hover:text-indigo-700"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Skills Grid */}
      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-600">Loading skills...</p>
        </div>
      ) : skills.length > 0 ? (
        <>
          <p className="text-gray-600 mb-6">Found {skills.length} skills</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill) => (
              <SkillCard key={skill._id} skill={skill} />
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600">No skills found. Try adjusting your filters.</p>
        </div>
      )}
    </div>
  );
}

export default ExploreSkills;

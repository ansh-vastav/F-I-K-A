import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';

const API_URL = "https://ansh-portfolio.onrender.com/api/technologies";

export default function TechManager() {
  const [technologies, setTechnologies] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTech, setCurrentTech] = useState(null);

  useEffect(() => {
    fetchTechnologies();
  }, []);

  const fetchTechnologies = async () => {
    try {
      const response = await axios.get(API_URL);
      setTechnologies(response.data);
    } catch (error) {
      toast.error("Failed to load technologies");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const tech = {
      name: formData.get('name'),
      iconUrl: formData.get('icon'),
      description: formData.get('description'),
      proficiency: parseInt(formData.get('proficiency')),
    };

    try {
      if (currentTech) {
        await axios.put(`${API_URL}/${currentTech._id}`, tech);
        toast.success("Technology updated successfully");
      } else {
        await axios.post(API_URL, tech);
        toast.success("Technology added successfully");
      }
      fetchTechnologies();
      setIsEditing(false);
      setCurrentTech(null);
    } catch (error) {
      toast.error("Operation failed");
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this technology?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        toast.success("Technology deleted successfully");
        fetchTechnologies();
      } catch (error) {
        toast.error("Failed to delete technology");
      }
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Technologies</h2>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Technology
          </button>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            defaultValue={currentTech?.name || ''}
            placeholder="Name"
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          />
          <input
            type="text"
            name="icon"
            defaultValue={currentTech?.iconUrl || ''}
            placeholder="Icon URL"
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          />
          <textarea
            name="description"
            defaultValue={currentTech?.description || ''}
            placeholder="Description"
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            rows={3}
            required
          />
          <input
            type="number"
            name="proficiency"
            defaultValue={currentTech?.proficiency || ''}
            placeholder="Proficiency (0-100)"
            min="0"
            max="100"
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          />
          <div className="flex gap-2">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {currentTech ? 'Update' : 'Add'} Technology
            </button>
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                setCurrentTech(null);
              }}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          {technologies.map((tech) => (
            <motion.div
              key={tech._id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded"
            >
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">{tech.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Proficiency: {tech.proficiency}%
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setCurrentTech(tech);
                    setIsEditing(true);
                  }}
                  className="p-2 text-blue-600 hover:text-blue-700"
                >
                  <Edit className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleDelete(tech._id)}
                  className="p-2 text-red-600 hover:text-red-700"
                >
                  <Trash className="h-5 w-5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

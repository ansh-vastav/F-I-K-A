import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const API_URL = 'https://ansh-portfolio.onrender.com/api/portfolios';

export default function ProjectsManager() {
  const [projects, setProjects] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get(API_URL);
      setProjects(response.data);
    } catch (error) {
      toast.error('Failed to fetch projects');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const project = {
      title: formData.get('title'),
      description: formData.get('description'),
      imageUrl: formData.get('image'),
      technologies: formData.get('technologies').split(',').map(t => t.trim()),
      githubLink: formData.get('link'),
      slug: formData.get('slug'),
    };

    try {
      if (currentProject) {
        await axios.put(`${API_URL}/${currentProject._id}`, project);
        toast.success('Project updated successfully');
      } else {
        await axios.post(API_URL, project);
        toast.success('Project added successfully');
      }
      fetchProjects();
      setIsEditing(false);
      setCurrentProject(null);
    } catch (error) {
      toast.error('Error saving project');
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        toast.success('Project deleted successfully');
        fetchProjects();
      } catch (error) {
        toast.error('Error deleting project');
      }
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Projects</h2>
        {!isEditing && (
          // <button
          //   onClick={() => setIsEditing(true)}
          //   className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          // >
          //   <Plus className="h-4 w-4 mr-2" />
          //   Add Project
          // </button>
          <button
  onClick={() => {
    setIsEditing(true);
    setCurrentProject(null); // Ensure new project form is empty
  }}
  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
>
  <Plus className="h-4 w-4 mr-2" />
  Add Project
</button>

        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="title" defaultValue={currentProject?.title} placeholder="Title" required className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" />
          <textarea name="description" defaultValue={currentProject?.description} placeholder="Description" required className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" rows={3} />
          <input type="text" name="image" defaultValue={currentProject?.imageUrl} placeholder="Image URL" required className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" />
          <input type="text" name="technologies" defaultValue={currentProject?.technologies?.join(', ')} placeholder="Technologies (comma-separated)" required className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" />
          <input type="text" name="link" defaultValue={currentProject?.githubLink} placeholder="GitHub Link" required className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" />
          <input type="text" name="slug" defaultValue={currentProject?.slug} placeholder="Slug" required className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" />
          <div className="flex gap-2">
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">{currentProject ? 'Update' : 'Add'} Project</button>
            <button type="button" onClick={() => { setIsEditing(false); setCurrentProject(null); }} className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">Cancel</button>
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          {projects.map((project) => (
            <motion.div key={project._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">{project.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{project.technologies.join(', ')}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => { setCurrentProject(project); setIsEditing(true); }} className="p-2 text-blue-600 hover:text-blue-700">
                  <Edit className="h-5 w-5" />
                </button>
                <button onClick={() => handleDelete(project._id)} className="p-2 text-red-600 hover:text-red-700">
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

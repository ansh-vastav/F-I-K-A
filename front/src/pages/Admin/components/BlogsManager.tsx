import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Edit, Trash } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

const API_URL = "https://ansh-portfolio.onrender.com/api/blogs";

export default function BlogsManager() {
  const [blogs, setBlogs] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentBlog, setCurrentBlog] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(API_URL);
      setBlogs(response.data);
    } catch (error) {
      toast.error("Failed to fetch blogs");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const blog = {
      title: formData.get("title"),
      excerpt: formData.get("excerpt"),
      content: formData.get("content"),
      date: formData.get("date"),
      imageUrl: formData.get("image"),
      slug: formData.get("slug"),
    };

    try {
      if (currentBlog) {
        await axios.put(`${API_URL}/${currentBlog._id}`, blog);
        toast.success("Blog updated successfully");
      } else {
        await axios.post(API_URL, blog);
        toast.success("Blog added successfully");
      }
      fetchBlogs();
      setIsEditing(false);
      setCurrentBlog(null);
    } catch (error) {
      toast.error("Error saving blog");
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this blog?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        toast.success("Blog deleted successfully");
        fetchBlogs();
      } catch (error) {
        toast.error("Error deleting blog");
      }
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Blogs</h2>
        {!isEditing && (
          <button
            onClick={() => {
              setIsEditing(true);
              setCurrentBlog(null);
            }}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" /> Add Blog
          </button>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="title" defaultValue={currentBlog?.title} placeholder="Title" required className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" />
          <input type="text" name="excerpt" defaultValue={currentBlog?.excerpt} placeholder="Excerpt" required className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" />
          <textarea name="content" defaultValue={currentBlog?.content} placeholder="Content" rows={5} required className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" />
          <input type="date" name="date" defaultValue={currentBlog?.date} required className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" />
          <input type="text" name="image" defaultValue={currentBlog?.imageUrl} placeholder="Image URL" required className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" />
          <input type="text" name="slug" defaultValue={currentBlog?.slug} placeholder="Slug" required className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" />
          <div className="flex gap-2">
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              {currentBlog ? "Update" : "Add"} Blog
            </button>
            <button type="button" onClick={() => { setIsEditing(false); setCurrentBlog(null); }} className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">Cancel</button>
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          {blogs.map((blog) => (
            <motion.div key={blog._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">{blog.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{blog.date}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => { setCurrentBlog(blog); setIsEditing(true); }} className="p-2 text-blue-600 hover:text-blue-700">
                  <Edit className="h-5 w-5" />
                </button>
                <button onClick={() => handleDelete(blog._id)} className="p-2 text-red-600 hover:text-red-700">
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
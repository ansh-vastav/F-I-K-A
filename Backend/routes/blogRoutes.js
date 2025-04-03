// import express from "express";
// import { createBlog, getBlogs } from "../controllers/blogController.js";

// const router = express.Router();
// router.post("/", createBlog);
// router.get("/", getBlogs);

// export default router;

import express from "express";
import { createBlog, getBlogs, getBlogById, updateBlog, deleteBlog } from "../controllers/blogController.js";

const router = express.Router();

router.post("/", createBlog);          // Create a blog
router.get("/", getBlogs);              // Get all blogs
router.get("/:id", getBlogById);        // Get blog by ID
router.put("/:id", updateBlog);         // Update blog by ID
router.delete("/:id", deleteBlog);      // Delete blog by ID

export default router;

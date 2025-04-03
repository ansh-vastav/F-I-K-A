import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: String, required: true },
    imageUrl: { type: String, required: true },
    slug: { type: String, unique: true, required: true },
});

export default mongoose.model("Blog", blogSchema);

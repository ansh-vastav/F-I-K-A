import mongoose from "mongoose";

const portfolioSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    technologies: [{ type: String, required: true }],
    githubLink: { type: String, required: true },
    slug: { type: String, unique: true, required: true },
});

export default mongoose.model("Portfolio", portfolioSchema);

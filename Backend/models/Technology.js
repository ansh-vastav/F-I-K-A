import mongoose from "mongoose";

const technologySchema = new mongoose.Schema({
    name: { type: String, required: true },
    iconUrl: { type: String, required: true },
    description: { type: String, required: true },
    proficiency: { type: Number, required: true, min: 0, max: 100 },
});

export default mongoose.model("Technology", technologySchema);

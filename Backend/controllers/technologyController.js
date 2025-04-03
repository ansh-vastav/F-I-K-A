import Technology from "../models/Technology.js";

export const createTechnology = async (req, res) => {
    try {
        const technology = new Technology(req.body);
        await technology.save();
        res.status(201).json(technology);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getTechnologies = async (req, res) => {
    try {
        const technologies = await Technology.find();
        res.json(technologies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Get Technology by ID
export const getTechnologyById = async (req, res) => {
    try {
        const technology = await Technology.findById(req.params.id);
        if (!technology) {
            return res.status(404).json({ message: "Technology not found" });
        }
        res.json(technology);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Technology by ID
export const updateTechnology = async (req, res) => {
    try {
        const updatedTechnology = await Technology.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTechnology) {
            return res.status(404).json({ message: "Technology not found" });
        }
        res.json(updatedTechnology);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete Technology by ID
export const deleteTechnology = async (req, res) => {
    try {
        const deletedTechnology = await Technology.findByIdAndDelete(req.params.id);
        if (!deletedTechnology) {
            return res.status(404).json({ message: "Technology not found" });
        }
        res.json({ message: "Technology deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

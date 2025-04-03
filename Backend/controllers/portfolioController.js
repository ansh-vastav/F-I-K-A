import Portfolio from "../models/Portfolio.js";

export const createPortfolio = async (req, res) => {
    try {
        const portfolio = new Portfolio(req.body);
        await portfolio.save();
        res.status(201).json(portfolio);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getPortfolios = async (req, res) => {
    try {
        const portfolios = await Portfolio.find();
        res.json(portfolios);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single portfolio by ID
export const getPortfolioById = async (req, res) => {
    try {
        const portfolio = await Portfolio.findById(req.params.id);
        if (!portfolio) {
            return res.status(404).json({ message: "Portfolio not found" });
        }
        res.json(portfolio);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a portfolio by ID
export const updatePortfolio = async (req, res) => {
    try {
        const updatedPortfolio = await Portfolio.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedPortfolio) {
            return res.status(404).json({ message: "Portfolio not found" });
        }
        res.json(updatedPortfolio);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a portfolio by ID
export const deletePortfolio = async (req, res) => {
    try {
        const deletedPortfolio = await Portfolio.findByIdAndDelete(req.params.id);
        if (!deletedPortfolio) {
            return res.status(404).json({ message: "Portfolio not found" });
        }
        res.json({ message: "Portfolio deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

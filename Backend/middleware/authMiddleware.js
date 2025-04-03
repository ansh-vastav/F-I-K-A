export const adminAuth = (req, res, next) => {
    const { password } = req.body;

    if (password === process.env.ADMIN_PASSWORD) {
        next();
    } else {
        res.status(401).json({ message: "Unauthorized" });
    }
};

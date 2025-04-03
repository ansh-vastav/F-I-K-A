// // export const loginAdmin = (req, res) => {
// //     res.json({ message: "Admin authenticated successfully" });
// // };

// export const loginAdmin = (req, res) => {
//     res.json({
//         success: true,
//         message: "Admin authenticated successfully",
//         token: "dummy_token" // You can implement JWT token authentication if needed
//     });
// };

// export const logoutAdmin = (req, res) => {
//     res.json({
//         success: true,
//         message: "Admin logged out successfully"
//     });
// };

import dotenv from "dotenv";

dotenv.config(); // Load environment variables

export const loginAdmin = (req, res) => {
    const { password } = req.body;

    if (!password) {
        return res.status(400).json({ success: false, message: "Password is required" });
    }

    if (password !== process.env.ADMIN_PASSWORD) {
        return res.status(401).json({ success: false, message: "Invalid password" });
    }

    res.json({
        success: true,
        message: "Admin authenticated successfully",
        token: "dummy_token" 
    });
};

export const logoutAdmin = (req, res) => {
    res.json({
        success: true,
        message: "Admin logged out successfully"
    });
};

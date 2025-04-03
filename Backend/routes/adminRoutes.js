// import express from "express";
// import { loginAdmin } from "../controllers/adminController.js";
// import { adminAuth } from "../middleware/authMiddleware.js";

// const router = express.Router();
// router.post("/login", adminAuth, loginAdmin);

// export default router;

import express from "express";
import { loginAdmin, logoutAdmin } from "../controllers/adminController.js";

const router = express.Router();

router.post("/login", loginAdmin);
router.post("/logout", logoutAdmin);

export default router;

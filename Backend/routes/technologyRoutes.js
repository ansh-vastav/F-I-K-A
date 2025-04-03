// import express from "express";
// import { createTechnology, getTechnologies } from "../controllers/technologyController.js";

// const router = express.Router();
// router.post("/", createTechnology);
// router.get("/", getTechnologies);

// export default router;

import express from "express";
import {
    createTechnology,
    getTechnologies,
    getTechnologyById,
    updateTechnology,
    deleteTechnology
} from "../controllers/technologyController.js";

const router = express.Router();

router.post("/", createTechnology);
router.get("/", getTechnologies);
router.get("/:id", getTechnologyById);
router.put("/:id", updateTechnology);
router.delete("/:id", deleteTechnology);

export default router;

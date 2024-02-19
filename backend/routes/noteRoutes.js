import express from "express";
import { getNotes, addNote } from "../controllers/noteController.js";
import { protect } from "../middleware/authMiddleware.js";
// When mergeParams is set to true, it allows the router to access parameters defined in the parent router. This is commonly used in nested routers when you want child routers to have access to the parameters defined in their parent router.
const router = express.Router({ mergeParams: true });

router.route("/").get(protect, getNotes).post(protect, addNote);

export default router;

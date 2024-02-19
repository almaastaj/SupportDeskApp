import express from "express";
import {
    getTickets,
    getTicket,
    createTicket,
    updateTicket,
    deleteTicket,
} from "../controllers/ticketController.js";
import { protect } from "../middleware/authMiddleware.js";
import noteRouter from "../routes/noteRoutes.js";

const router = express.Router();
// This method is used to mount middleware functions in the Express router. Middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle.
router.use("/:ticketId/notes", noteRouter);
// This is the path at which the middleware will be mounted. It specifies that any request with a URL matching this pattern will trigger the middleware.

router.route("/").get(protect, getTickets).post(protect, createTicket);

router
    .route("/:id")
    .get(protect, getTicket)
    .delete(protect, deleteTicket)
    .put(protect, updateTicket);

export default router;

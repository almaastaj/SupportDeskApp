import express from "express";
import colors from "colors";
import userRoutes from "./routes/userRoutes.js";
import dotenv from "dotenv";
import errorHandler from "./middleware/errorMiddleware.js";
// * dotenv setup => to read data from .env file (After calling dotenv.config(), your .env file should be parsed, and its key-value pairs will be available in process.env)
dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

// * MiddleWare: - To decode to request body (json and urlencoded)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// * Routes
app.use("/api/users", userRoutes);

// * Server Frontend
// To create a route with express
app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to the Support Desk API" });
});

// error Handler
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on Port ${PORT}`.green));

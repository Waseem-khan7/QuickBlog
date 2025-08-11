import express from "express";
import "dotenv/config";
import cors from "cors";
import connectToDatabase from "./config/dbConnection.js";
import adminRouter from "./routes/admin.routes.js";

const app = express();

const PORT = process.env.PORT || 8001;

//Connecting Database
await connectToDatabase();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => res.send("API is working"));
app.use("/api/admin", adminRouter);

app.listen(PORT, () =>
  console.log(`Server is started on port: ${PORT} http://localhost: ${PORT}`)
);

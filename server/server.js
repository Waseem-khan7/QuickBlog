import express from "express";
import "dotenv/config";
import cors from "cors";

const app = express();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => res.send("API is working"));

app.listen(PORT, () => console.log(`Server is started on port: ${PORT}`));

import express from "express";
import { addBLog } from "../controllers/blog.controller.js";
import upload from "../middlewares/multer.js";
import auth from "../middlewares/auth.middleware.js";

const blogRouter = express.Router();

blogRouter.post("/add", upload.single("image"), auth, addBLog);

export default blogRouter;

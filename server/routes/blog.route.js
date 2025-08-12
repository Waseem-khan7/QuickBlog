import express from "express";
import {
  addBlog,
  addComment,
  deleteById,
  getAllBlogs,
  getBlogById,
  getBlogComment,
  togglePublish,
} from "../controllers/blog.controller.js";
import upload from "../middlewares/multer.js";
import auth from "../middlewares/auth.middleware.js";

const blogRouter = express.Router();

blogRouter.post("/add", upload.single("image"), auth, addBlog);
blogRouter.get("/all", getAllBlogs);
blogRouter.get("/:blogId", getBlogById);
blogRouter.delete("/delete", auth, deleteById);
blogRouter.post("/toggle-publish", auth, togglePublish);
blogRouter.post("/addComment", addComment);
blogRouter.get("/comments", getBlogComment);

export default blogRouter;

import fs from "fs";
import imagekit from "../config/imageKit.js";
import Blog from "../models/blog.model.js";
import Comment from "../models/comment.model.js";

const addBlog = async (req, res) => {
  try {
    const { title, subTitle, description, category, isPublished } = JSON.parse(
      req.body.blog
    );
    const imageFile = req.file;

    // check all fields persent
    if (
      !title ||
      !subTitle ||
      !description ||
      !category ||
      !isPublished === undefined
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const fileBuffer = fs.readFileSync(imageFile.path);

    // Upload image to ImageKit
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/blogs",
    });

    // Optimization through imagekit URL transformation
    const optimizedImageUrl = imagekit.url({
      path: response.filePath,
      transformation: [
        { quality: "auto" }, // Auto Compression
        { format: "webp" }, // Convert to Modern format
        { width: "1280" }, // Width resizing
      ],
    });
    const image = optimizedImageUrl;

    const newBlog = await Blog.create({
      title,
      subTitle,
      description,
      category,
      image,
      isPublished,
    });

    res.status(201).json({
      success: true,
      message: "Blog added Successfully",
      blog: newBlog,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const search = req.query.search;
    const query = {
      isPublished: true,
    };
    if (search) {
      query.$or = [
        { title: new RegExp(search, "i") },
        { category: new RegExp(search, "i") },
        { subTitle: new RegExp(search, "i") },
      ];
    }
    const blogs = await Blog.find(query);
    res.status(200).json({ success: true, blogs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getBlogById = async (req, res) => {
  try {
    const { blogId } = req.params;
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }
    res.status(200).json({ success: true, blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteBlogById = async (req, res) => {
  try {
    const { id } = req.body;
    await Blog.findByIdAndDelete(id);

    // Delete all comments associated with the Blog
    await Comment.deleteMany({ blog: id });

    res
      .status(200)
      .json({ success: true, message: "Blog deleted Successfully " });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const togglePublish = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Blog ID is required" });
    }

    const blog = await Blog.findById(id);

    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }

    blog.isPublished = !blog.isPublished;
    await blog.save();

    res.status(200).json({
      success: true,
      message: "Blog status updated",
      isPublished: blog.isPublished,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const addComment = async (req, res) => {
  try {
    const { blog, name, content } = req.body;

    if (!blog || !name || !content) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    await Comment.create({ blog, name, content });
    res
      .status(201)
      .json({ success: true, message: "Comment added for review" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getBlogComment = async (req, res) => {
  try {
    const { blogId } = req.body;
    if (!blogId) {
      return res
        .status(400)
        .json({ success: false, message: "Blog ID is required" });
    }
    const comments = await Comment.find({
      blog: blogId,
      isApproved: true,
    }).sort({
      createdAt: -1,
    });
    res.status(201).json({ success: true, comments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export {
  addBlog,
  getAllBlogs,
  getBlogById,
  deleteBlogById,
  togglePublish,
  addComment,
  getBlogComment,
};

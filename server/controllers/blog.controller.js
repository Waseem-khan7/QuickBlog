import fs from "fs";
import imagekit from "../config/imageKit.js";
import Blog from "../models/blog.model.js";

export const addBLog = async (req, res) => {
  try {
    const { title, subTitle, description, category, isPublished } = JSON.parse(
      req.body.blog
    );
    const imageFile = req.file;

    // check all fields persent
    if (!title || !subTitle || !description || !category || !isPublished) {
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

    await Blog.create({
      title,
      subTitle,
      description,
      category,
      image,
      isPublished,
    });

    res.status(201).json({ success: true, message: "Blog added Successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

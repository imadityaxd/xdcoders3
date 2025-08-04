import Blog from "../models/Blog.js";

export const getBlogs = async (req, res) => {
  const blogs = await Blog.find();
  res.json(blogs);
};

export const createBlog = async (req, res) => {
  const blog = new Blog(req.body);
  await blog.save();
  res.status(201).json(blog);
};

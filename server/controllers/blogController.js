//provide the image
import fs from "fs";
import mongoose from "mongoose";
import imagekit from "../configs/imageKit.js";
import Blog from "../models/Blog.js";
import Comment from "../models/Comment.js";
import main from "../configs/gemini.js";
export const addBlog = async (req, res) => {
  try {
    const { title, subTitle, description, category, isPublished } = JSON.parse(
      req.body.blog
    );
    const imageFile = req.file;
    //Check if all fields are present
    if (!title || !description || !category || !imageFile) {
      return res.json({ success: false, message: "Missing required fields" });
    }
    //convert image to 64 base
    //convert to buffer format
    const fileBuffer = fs.readFileSync(imageFile.path);

    //upload image to imagekit
    //the originalname is all lowercase
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/blogs",
    });

    //optimization through image kit url transformation
    //the method for generating a transformed url ussually imagekit.url
    const optimizedIMageUrl = imagekit.url({
      path: response.filePath,
      transformation: [
        { quality: "auto" }, //auto compression
        { format: "webp" }, //convert to modern format
        { width: "1280" }, // width resizing
      ],
    });

    const image = optimizedIMageUrl;

    await Blog.create({
      title,
      subTitle,
      description,
      category,
      image,
      isPublished,
    });

    res.json({ success: true, message: "Blog added successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
//create an API controller function to get all blogs
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ isPublished: true });
    res.json({ success: true,  blogs });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
export const getBlogById = async (req, res) => {
  try {
    const { blogId } = req.params;
    
    // Validate if blogId is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(blogId)) {
      return res.json({ 
        success: false, 
        message: "Invalid blog ID format" 
      });
    }
    
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.json({ success: false, message: "Blog not found" });
    }
    res.json({ success: true, blog });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const deleteBlogById = async (req, res) => {
  try {
    const { id } = req.body;
    
    // Validate if id is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.json({ 
        success: false, 
        message: "Invalid blog ID format" 
      });
    }
    
    await Blog.findByIdAndDelete(id);
    //Delte the commenets associated with the blog
    await Comment.deleteMany({blog:id});
    res.json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const togglePublish = async (req, res) => {
  try {
    const { id } = req.body;
    
    // Validate if id is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.json({ 
        success: false, 
        message: "Invalid blog ID format" 
      });
    }
    
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.json({ success: false, message: "Blog not found" });
    }
    
    blog.isPublished = !blog.isPublished;
    await blog.save();
    res.json({ 
      success: true, 
      message: "Blog status updated",
      isPublished: blog.isPublished 
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const addComment = async (req, res) => {
  try {
    //get the data from the frontend
    const { blog,name,content } = req.body;
    await Comment.create({ blog,name,content });
    res.json({ success: true, message: "Comment added for review" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getBlogComments = async (req,res) => { 
  try {
    //change to body becuase the frontend using post
    const {blogId} = req.body;
    if (!blogId) {
      return res.json({ success: false, message: "Blog ID is required" });
    }
    if (!mongoose.Types.ObjectId.isValid(blogId)) {
      return res.json({ success: false, message: "Invalid blog ID format" });
    }
    //sort the comments by createdAt in descending order
    const comments = await Comment.find({ blog: blogId ,isApproved:true}).sort({createdAt:-1});
    res.json({ success: true, comments });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}

export const generateContent = async (req,res) => { 
  try {
    const {prompt} = req.body;
    const content = await main(prompt + ' Generate a blog content for this topic in simple text format');
    res.json({success : true, content})

  } catch (error) {
    res.json({success:false, message : error.message})
  }
}

export default addBlog;

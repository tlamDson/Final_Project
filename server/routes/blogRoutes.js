//use to create API endpoints

import express from "express";
import upload from "../middleware/multer.js";
import auth from "../middleware/auth.js";
import addBlog, {
  addComment,
  deleteBlogById,
  getAllBlogs,
  getBlogById,
  togglePublish,
  getBlogComments,
  generateContent
} from "../controllers/blogController.js";

const blogRoutes = express.Router();

blogRoutes.post("/add", upload.single("image"), auth, addBlog);
blogRoutes.get("/all", getAllBlogs);
blogRoutes.post("/delete", auth, deleteBlogById); //only the admin can delete it
blogRoutes.post("/toggle-publish", auth, togglePublish);
blogRoutes.post("/add-comment",addComment);
blogRoutes.post("/comments",getBlogComments);
blogRoutes.post('/generate',auth,generateContent);
blogRoutes.get("/:blogId", getBlogById); // Keep dynamic route LAST
export default blogRoutes;

//next add the  blogRouter into the main file.js

//add the middleware

//to parse the image use the mullter package

//add another middle ware to protect so that only admin can add this

import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, require: true },
    subTitle: { type: String },
    description: { type: String, require: true },
    category: { type: String, require: true },
    image: { type: String, require: true },
    isPublished: { type: Boolean, require: true },
  },
  { timestamps: true }
);
//using schema we will create a model
const Blog = mongoose.model("blog", blogSchema);

export default Blog;


//use the blog model to store the model in the db
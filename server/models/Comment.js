import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
   blog:{type : mongoose.Schema.Types.ObjectId,ref:"blog",require : true},
   name:{type : String,require : true},
   content:{type : String,require : true},
   isApproved:{type : Boolean,default : false},
  },
  { timestamps: true }
);
//using schema we will create a model
const Comment = mongoose.model("Comment", commentSchema);

export default Comment;



import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  spotId: {
    type: Number,
    required: true,
  },
  commenter: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;

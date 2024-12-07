import express from "express";
import Comment from "../models/Comment.js";

const router = express.Router();

router.post("/:spotId/comment", async (req, res) => {
  try {
    const { content, commenter, username } = req.body;
    const comment = new Comment({
      spotId: req.params.spotId,
      commenter,
      content,
      username,
    });
    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/:spotId", async (req, res) => {
  try {
    const comments = await Comment.find({ spotId: req.params.spotId }).sort({
      createdAt: -1,
    });

    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

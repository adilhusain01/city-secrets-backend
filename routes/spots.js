import express from "express";
import Spot from "../models/Spot.js";
import Comment from "../models/Comment.js";

const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const {
      spotId,
      creator,
      name,
      description,
      category,
      location,
      photos,
      username,
    } = req.body;

    const spot = new Spot({
      spotId,
      creator,
      name,
      description,
      category,
      location,
      photos,
      username,
    });

    await spot.save();
    res.status(201).json(spot);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/city/:city", async (req, res) => {
  try {
    const spots = await Spot.find({
      "location.city": req.params.city,
    });
    res.json(spots);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// New endpoint to get spots by user
router.get("/user/:userId", async (req, res) => {
  try {
    const spots = await Spot.find({
      creator: req.params.userId,
    });
    res.json(spots);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// New endpoint to get all spots with additional field
router.get("/", async (req, res) => {
  try {
    const spots = await Spot.find();
    res.json(spots);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// New endpoint to get a specific spot by spotId
router.get("/id/:id", async (req, res) => {
  try {
    const spot = await Spot.findOne({ spotId: req.params.id });
    if (!spot) {
      return res.status(404).json({ error: "Spot not found" });
    }
    res.json(spot);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// New endpoint to delete a spot by spotId
router.delete("/:spotId", async (req, res) => {
  try {
    const spot = await Spot.findOneAndDelete({ spotId: req.params.spotId });
    if (!spot) {
      return res.status(404).json({ error: "Spot not found" });
    }

    // Delete associated comments
    await Comment.deleteMany({ spotId: req.params.spotId });

    res.json({ message: "Spot and associated comments deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;

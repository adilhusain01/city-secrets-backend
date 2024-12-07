import express from "express";
import multer from "multer";
import cloudinary from "../config/cloudinaryConfig.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/", upload.array("photos"), async (req, res) => {
  try {
    const uploadPromises = req.files.map((file) =>
      cloudinary.uploader.upload(file.path)
    );

    const uploadResults = await Promise.all(uploadPromises);
    const urls = uploadResults.map((result) => result.secure_url);

    res.status(200).json({ urls });
  } catch (error) {
    console.error("Upload error:", error); // Add error logging
    res.status(500).json({ error: error.message });
  }
});

export default router;

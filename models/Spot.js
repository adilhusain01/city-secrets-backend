import mongoose from "mongoose";

const spotSchema = new mongoose.Schema({
  spotId: {
    type: Number,
    required: true,
    unique: true,
  },
  creator: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: String,
  category: {
    type: String,
    required: true,
  },
  location: {
    city: String,
    state: String,
    fullAddress: String,
    latitude: String,
    longitude: String,
  },
  photos: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Spot = mongoose.model("Spot", spotSchema);

export default Spot;

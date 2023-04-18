import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxLength: [120, "Name should not be more than 120 chars"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Collection", collectionSchema);

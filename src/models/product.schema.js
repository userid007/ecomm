import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      maxLength: [120, "Product name should not be more than 120 chars"],
    },
    price: {
      type: Number,
      rquired: [true, "Product price is required"],
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
      trim: true,
      maxLength: [
        5000,
        "Product description should not be more than 5000 chars",
      ],
    },
    photos: [
      {
        secure_url: {
          type: String,
          required: true,
        },
      },
    ],
    stock: {
      type: Number,
      default: 0,
      required: true,
    },
    sold: {
      type: Number,
      default: 0,
      required: true,
    },
    collectionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Collection",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);

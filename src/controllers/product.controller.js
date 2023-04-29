import Product from "../models/product.schema.js";
import Collection from "../models/collection.schema.js";
import { s3FileUpload, s3deleteFile } from "../service/imageUpload.js";
import Mongoose from "mongoose";
import asyncHandler from "../service/asyncHandler.js";
import CustomError from "../service/customError.js";
import config from "../config/index.js";
import fs from "fs";

export const addProduct = asyncHandler(async (req, res) => {
  const { fields, files } = req;
  let productId = new Mongoose.Types.ObjectId().toHexString();
  if (
    !fields.name ||
    !fields.price ||
    !fields.description ||
    !fields.collectionId
  ) {
    throw new CustomError("Please fill all the fields", 500);
  }

  const collection = await Collection.findById(fields.collectionId);
  if (!collection) {
    throw new CustomError("Collection does not found", 500);
  }
  let imgArrayResp = Promise.all(
    Object.values(files).map(async (file, index) => {
      const data = fs.readFileSync(file.filepath);
      const upload = await s3FileUpload({
        bucketName: config.S3_BUCKET_NAME,
        key: `products/${productId}/photo_${index + 1}.png`,
        body: data,
        contentType: file.mimetype,
      });
      return {
        secure_url: upload.Location,
      };
    })
  );

  let imgArray = await imgArrayResp;

  const product = await Product.create({
    _id: productId,
    photos: imgArray,
    ...fields,
  });

  if (!product) {
    throw new CustomError("Product failed to be created in DB", 400);
  }
  res.status(201).json({
    success: true,
    product,
  });
});
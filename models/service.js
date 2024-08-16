import mongoose from "mongoose";

const offerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const serviceSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: [true, "Type is required"],
    },
    status: {
      type: String,
      required: [true, "Status is required"],
    },
    image: {
      type: String,
      required: [true, "Image is required"],
    },
    offers: {
      type: [offerSchema],
      required: [true, "Offers are required"],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default mongoose.model("Service", serviceSchema);

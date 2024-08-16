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
    timestamps: false,
  }
);

const imgSchema = new mongoose.Schema(
  {
    src: String,
  },
  {
    versionKey: false,
    timestamps: false,
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
    offers: {
      type: [offerSchema],
      required: [true, "Offers are required"],
    },
    image: {
      type: imgSchema,
      required: [true, "Image is required"],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default mongoose.model("Service", serviceSchema);

import mongoose from "mongoose";

const newsImgSchema = new mongoose.Schema(
  {
    src: {
      type: String,
      required: [true, "News image src is required"],
    },
  },
  {
    versionKey: false,
    timestamps: false,
  }
);

const newsPostSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["preview-text", "main-text", "quote-text", "post-list"],
      required: [true, "Post type is required"],
    },
    text: {
      type: [String],
      required: [true, "Post text is required"],
    },
  },
  {
    versionKey: false,
    timestamps: false,
  }
);

const newsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "News title is required"],
    },
    type: {
      type: String,
      enum: [
        "Company News",
        "Expert Tips",
        "Industry News",
        "Innovation",
        "Marketing",
      ],
      required: [true, "News type is required"],
    },
    posts: {
      type: [newsPostSchema],
      required: [true, "News posts are required"],
    },
    date: {
      type: String,
      required: [true, "News date is required"],
    },
    image: {
      type: newsImgSchema,
      required: [true, "News image is required"],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default mongoose.model("News", newsSchema);

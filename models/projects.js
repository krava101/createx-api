import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    type: {
      type: String,
      required: [true, "Type is required"],
    },
    status: {
      type: String,
      required: [true, "Status is required"],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
    },
    client: {
      type: String,
      required: [true, "Client is required"],
    },
    architect: {
      type: String,
      required: [true, "Architect is required"],
    },
    size: {
      type: String,
      required: [true, "Size is required"],
    },
    value: {
      type: String,
      required: [true, "Value is required"],
    },
    completed: {
      type: String,
      required: [true, "Completed is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    images: [String],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default mongoose.model("Project", projectSchema);

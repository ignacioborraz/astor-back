import mongoose from "mongoose";

const collection = "samples";

const schema = new mongoose.Schema(
  {
    section: { type: String, default: "" },
    title: { type: String, default: "" },
    color: { type: String, default: "#0f172a" },
    main_photo: { type: String, required: true },
    photos: [{ type: String, required: true }],
    date: { type: Date, required: true },
  },
  { timestamps: true }
);

const Sample = mongoose.model(collection, schema);

export default Sample;

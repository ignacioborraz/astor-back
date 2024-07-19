import mongoose from "mongoose";

const collection = "users";

const schema = new mongoose.Schema(
  {
    first_name: { type: String, default: "" },
    last_name: { type: String, default: "" },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/6596/6596121.png",
    },
    role: { type: String, default: "USER" },
  },
  { timestamps: true }
);

const User = mongoose.model(collection, schema);

export default User;

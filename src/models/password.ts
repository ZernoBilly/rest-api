import mongoose from "mongoose";
const { Schema } = mongoose;

const passwordSchema = new Schema({
  userID: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    maxlength: 30,
    default: "Random password",
  },
  password: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    maxlength: 20,
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
});

export default mongoose.model("Password", passwordSchema);

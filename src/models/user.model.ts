import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  passwordHash: {
    type: String,
    // select: false, // don't include this field in queries by default (security)
  },
});

export default mongoose.model("User", userSchema);

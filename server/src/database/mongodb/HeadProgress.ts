import mongoose from "mongoose";

const headProgressSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  status: {
    type: String,
    enum: ["in_progress", "done"],
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const HeadProgress = mongoose.model("HeadProgress", headProgressSchema);
export default HeadProgress;

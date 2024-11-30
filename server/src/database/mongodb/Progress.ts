import mongoose from "mongoose";

const progressSchema = new mongoose.Schema({
  headProgressId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "HeadProgress",
    required: true,
  },
  videoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "File",
    required: true,
  },
  status: {
    type: String,
    enum: ["todo", "done"],
    required: true,
  },
});

const Progress = mongoose.model("Progress", progressSchema);
export default Progress;

import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  referenceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "File",
    required: true,
  },
  content: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  status: {
    type: String,
    enum: ["PROCESSING", "QUEUED", "DONE", "FAILED", "CREATED"],
    required: true,
  },
  name: {
    type: String,
    enum: ["video_processing", "sqs_general_queue", "error_register"],
    required: true,
  },
  attempts: {
    type: Number,
    required: true,
    default: 0,
  },
  error_message: {
    type: String,
    required: false,
  },
  error_content: {
    type: mongoose.Schema.Types.Mixed,
    required: false,
  },
});

const Job = mongoose.model("Job", jobSchema);
export default Job;

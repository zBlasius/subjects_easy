import mongoose from "mongoose";

const searchCodeSchema = new mongoose.Schema({
  table: {
    type: String,
    required: true,
  },
  lastCode: {
    type: Number,
    required: true,
  }
});

const SearchCode = mongoose.model("SearchCode", searchCodeSchema);
export default SearchCode;

const mongoose = require("mongoose");
const urlSchema = new mongoose.Schema(
  {
    shortId: {
      type: string,
      required: true,
      unique: true,
    },
    redirectUrl: {
      type: string,
      required: true,
    },
    visitHistory: [{ timestamp: { type: Number } }],
  },
  { timestamps: true }
);
module.exports = mongoose.model("Url", urlSchema);

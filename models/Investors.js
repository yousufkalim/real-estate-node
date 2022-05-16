/**
 * Investors schema
 * @author Shuja Naqvi
 */
const { Schema, model } = require("mongoose");

// Schema
const investorSchema = new Schema(
  {
    first_name: String,
    last_name: String,
    phone: {
      type: String,
      required: true,
    },
    projects: [
      {
        project: {
          type: Schema.Types.ObjectId,
          ref: "projects",
        },
        shares: Number,
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Model
module.exports = model("investors", investorSchema);

/**
 * News schema
 * @author Shuja Naqvi
 */
const { Schema, model } = require("mongoose");

// Schema
const newsSchema = new Schema(
  {
    project: { type: Schema.Types.ObjectId, ref: "projects" },
    total_cost: Number,
    selling_price: Number,
    news_date: Date,
    end_date: Date,
    pictures: [],
    comments: [
      {
        comment: String,
        user: { type: Schema.Types.ObjectId, ref: "investors" },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Model
module.exports = model("news", newsSchema);

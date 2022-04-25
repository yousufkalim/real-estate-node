/**
 * Project schema
 * @author Shuja Naqvi
 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema(
  {
    name: String,
    dispaly_picture: String,
    city: String,
    unit_share: Number,
    selling_price: Number,
    start_date: {
      type: Date,
      default: Date.now,
    },
    end_date: Date,
    total_cost: Number,
    total_shares: Number,
    date: {
      type: Date,
      default: Date.now,
    },
    history: {
      unit_share: Number,
      selling_price: Number,
      end_date: Date,
      total_cost: Number,
      total_shares: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("project", projectSchema);

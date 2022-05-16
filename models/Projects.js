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
    remaining_shares: Number,
    date: {
      type: Date,
      default: Date.now,
    },
    history: [
      {
        unit_share: Number,
        selling_price: Number,
        end_date: Date,
        total_cost: Number,
        total_shares: Number,
      },
    ],
    // news: {
    //   comment: String,
    //   new_selling_price: Number,
    //   news_date: Date,
    //   new_end_date: Date,
    //   new_total_cost: Number,
    //   pictures: [
    //     {
    //       file: String,
    //     },
    //   ],
    // },
    news: [{ type: Schema.Types.ObjectId, ref: "news" }],
    investors: [
      {
        investor: {
          type: Schema.Types.ObjectId,
          ref: "investors",
        },
        shares: Number,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("projects", projectSchema);

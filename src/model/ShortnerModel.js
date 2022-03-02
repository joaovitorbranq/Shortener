import mongoose from "mongoose";

const ShortnerSchema = mongoose.Schema(
  {
    link: { type: String, required: true},
    hash: {type: String, required: false },
    hits: {type: Number, default: 0,},
    metadata: mongoose.Schema.Types.Mixed,
    expired: {type: Boolean, default: false},
    expiredDate: Date,
    name: String,  
  },
  {
    timestamp: true,
  },
);

const ShortnerModel = mongoose.model("shortner", ShortnerSchema);

export default ShortnerModel;






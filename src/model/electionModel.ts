import mongoose, { Schema, type Document, type Model } from "mongoose";
import { type CandidateT } from "./candidateModel";

interface ElectionT extends Document {
  name: string;
  candidates: CandidateT["_id"];
  isLive: boolean,
}

const ElectionSchema: Schema = new Schema<ElectionT>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    candidates: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Candidate",
      default: [],
    },
    isLive: {
        type: Boolean,
        default: false,
    }
  },
  { timestamps: true }
);

const Election: Model<ElectionT> =
  mongoose.models.Election ||
  mongoose.model<ElectionT>("Election", ElectionSchema);

export default Election;

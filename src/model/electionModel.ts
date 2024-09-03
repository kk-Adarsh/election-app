import mongoose, { Schema, type Document, type Model } from "mongoose";
import { type CandidateT } from "./candidateModel";

interface ElectionT extends Document {
  name: string;
  candidates: CandidateT["_id"];
  isLive: boolean;
}

interface CandidateEntryT {
  _id: CandidateT["_id"]; // Referencing the Candidate's ID
  votes: number; // Votes received by the candidate
}

const CandidateEntrySchema: Schema = new Schema<CandidateEntryT>(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Candidate", // Referencing the Candidate model
      required: true,
    },
    votes: {
      type: Number,
      default: 0,
    },
  },
  { _id: false } // Prevents automatic generation of _id for each candidate entry
);

const ElectionSchema: Schema = new Schema<ElectionT>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    candidates: {
      type: [CandidateEntrySchema],
      default: [],
    },
    isLive: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Election: Model<ElectionT> =
  mongoose.models.Election ||
  mongoose.model<ElectionT>("Election", ElectionSchema);

export default Election;

import mongoose, { Schema, type Document, type Model } from "mongoose";

export interface CandidateT extends Document {
  name: string;
  slogan: string;
  symbolImage: string;
}

const CandidateSchema: Schema = new Schema<CandidateT>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  slogan: {
    type: String,
  },
  symbolImage: {
    type: String,
  },
});

const Candidate: Model<CandidateT> =  mongoose.models.Candidate || mongoose.model<CandidateT>("Candidate", CandidateSchema);

export default Candidate;

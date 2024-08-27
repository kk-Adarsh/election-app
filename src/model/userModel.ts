import mongoose, { Schema, type Document, type Model } from "mongoose";
import  { type IRole } from "./roleModel"; 

interface IUser extends Document {
  username: string;
  password: string;
  role: IRole["_id"];
}

const UserSchema: Schema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
    required: true,
  },
});

const User: Model<IUser> =  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;

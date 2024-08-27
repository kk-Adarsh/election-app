import mongoose, { Schema, type Document, type Model } from "mongoose";

type Permission = (typeof allowedPermissions)[number];
export interface IRole extends Document {
  rolename: string;
  permissions: Permission[];
}

// Define the allowed permissions as an enum
export const allowedPermissions = [
  "CREATE_USER",
  "UPDATE_USER",
  "DELETE_USER",
  "READ_USER",
  "CREATE_ELECTION",
  "UPDATE_ELECTION",
  "DELETE_ELECTION",
  "READ_ELECTION",
  "CREATE_ROLE",
  "UPDATE_ROLE",
  "DELETE_ROLE",
  "READ_ROLE",
  "CREATE_CANDIDATE",
  "UPDATE_CANDIDATE",
  "DELETE_CANDIDATE",
  "READ_CANDIDATE",
  "VOTE",
] as const;

const RoleSchema: Schema = new Schema<IRole>({
  rolename: {
    type: String,
    required: true,
    unique: true,
  },
  permissions: {
    type: [String],
    enum: allowedPermissions,
    default: [],
  },
});

const Role: Model<IRole> = mongoose.model<IRole>("Role", RoleSchema);

export default Role;

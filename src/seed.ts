import mongoose from "mongoose";
import Role, { allowedPermissions } from "./model/roleModel";
import User from "./model/userModel";
import bcryptjs from "bcryptjs";

const initialRole = [
  {
    rolename: "Super Admin",
    permissions: allowedPermissions,
  },
  {
    rolename: "Voter",
    permissions: ["VOTE"],
  },
];
const hashPasswordFunc = async (password: string) => {
  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(password, salt);
  return hashedPassword;
};
const createInitialUsers = async () => {
  return [
    {
      username: "admin",
      password: await hashPasswordFunc("admin"),
    },
    {
      username: "user1",
      password: await hashPasswordFunc("user1"),
    },
    {
      username: "user2",
      password: await hashPasswordFunc("user2"),
    },
    {
      username: "user3",
      password: await hashPasswordFunc("user3"),
    },
    {
      username: "user4",
      password: await hashPasswordFunc("user4"),
    },
    {
      username: "user5",
      password: await hashPasswordFunc("user5"),
    },
  ];
};

const seedDatabase = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/next-tutor");

    await Role.deleteMany(); // Optional: Clear existing data
    await Role.insertMany(initialRole);

    const adminRole = await Role.findOne({ rolename: "Super Admin" });
    const voterRole = await Role.findOne({ rolename: "Voter" });
    await User.deleteMany(); 
    const initialUser = await createInitialUsers();
    await User.insertMany(
      initialUser.map((user) => ({
        ...user,
        role: user.username === "admin" ? adminRole?.id : voterRole?._id,
      }))
    );

    console.log("Database seeded successfully");
    mongoose.connection.close();
  } catch (err) {
    console.error("Error seeding database:", err);
  }
};

seedDatabase();

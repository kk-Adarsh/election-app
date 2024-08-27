import mongoose from "mongoose";

// Caching MongoDB connection
let cachedConnection: mongoose.Connection | null = null;

export async function connect() {
  if (cachedConnection) {
    console.log("Using cached MongoDB connection.");
    return true;
  }
  try {
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    mongoose.connect(process.env.MONGODB_URI!);
    // Caching the MongoDB connection
    cachedConnection = mongoose.connection;
    // const connection = mongoose.connection;
    cachedConnection.on("connected", () => {
      console.log("Mongo DB connected Successfully");
    });
    cachedConnection.on("error", (err) => {
      console.log(
        "Mongo DB connection error. Please make sure mongo db is running",
        err
      );
      process.exit();
    });
  } catch (error) {
    console.log("Somethin went wrong!", error);
  }
}

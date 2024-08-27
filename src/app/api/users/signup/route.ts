import { connect } from "@/dbConfig/dbConfig";
import User from "@/model/userModel";
import { type NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, password } = reqBody;

    console.log(reqBody);
    //check if user exist
    const user = await User.findOne({ username });
    if (user) {
      return NextResponse.json(
        { error: "User Already exists" },
        { status: 400 }
      );
    }

    //hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const newUser = new User({ username, password: hashedPassword });
    const savedUser = await newUser.save();
    console.log(savedUser);
    return NextResponse.json({
      message: "User created successfully",
      success: true,
      savedUser,
    });
  } catch (error: unknown) {
    let errorMessage = "An unknown error occurred";

    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

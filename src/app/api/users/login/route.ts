import { connect } from "@/dbConfig/dbConfig";
import User from "@/model/userModel";
import { type NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, password } = reqBody;

    const [user] = await User.aggregate([
      { $match: { username } },
      {
        $lookup: {
          from: "roles",
          localField: "role",
          foreignField: "_id",
          pipeline: [{ $project: { permissions: 1 } }],
          as: "roleDetails",
        },
      },
      { $unwind: "$roleDetails" },
      {
        $project: {
          _id: 1,
          username: 1,
          permisions: "$roleDetails.permissions",
          password: 1,
        },
      },
    ]);
    if (!user) {
      return NextResponse.json(
        { error: "User doesn't exists" },
        { status: 400 }
      );
    }

    // check if password is correct
    const validatePassword = await bcryptjs.compare(password, user.password);

    if (!validatePassword) {
      return NextResponse.json({ error: "Invalid Password" }, { status: 401 });
    }

    // create token data
    const tokenData = {
      id: user._id,
      username: user.username,
    };

    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });
    const response = NextResponse.json({
      message: "Login successfull",
      success: true,
      permissions: user.permisions,
    });
    response.cookies.set("token", token, { httpOnly: true });
    return response;
  } catch (error: unknown) {
    let errorMessage = "An unknown error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

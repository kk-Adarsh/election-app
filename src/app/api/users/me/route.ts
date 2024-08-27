import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";

export async function GET(request: NextRequest) {
  try {
    const { id } = await getDataFromToken(request);
    const user = await User.findById({ _id: id }).select("-password");
    return NextResponse.json({ message: "User Found", data: user });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

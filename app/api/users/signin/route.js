import UserModel from "@/app/models/userModel";
import db from "@/utils/db";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const { email, password } = await req.json();
  if (!email || !password) {
    return NextResponse.json({ error: "Invalid request email and pw missing" });
  }
  await db.connectDb();
  const user = await UserModel.findOne({ email });
  if (!user) {
    return NextResponse.json({ error: "Email and pw mismatch!!" });
  }
  const pwMatch = await user.comparePassword(password);
  if (!pwMatch) {
    return NextResponse.json({ error: "Email and pw mismatch!!" });
  }

  return NextResponse.json({
    user: {
      id: user._id.toString(),
      name: user.name,
      avatar: user.avatar?.url,
      role: user.role,
    },
  });
};

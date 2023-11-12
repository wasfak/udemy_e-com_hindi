import EmailVerificationToken from "@/app/models/emailVerificationToken";
import UserModel from "@/app/models/userModel";
import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const { userId, token } = await req.json();
    if (!isValidObjectId(userId) || !token) {
      return NextResponse.json({ error: "invalid request" }, { status: 401 });
    }

    const verifyToken = await EmailVerificationToken.findOne({ user: userId });
    if (!verifyToken) {
      return NextResponse.json({ error: "invalid token" }, { status: 401 });
    }
    const isMatched = await verifyToken.compareToken(token);
    if (!isMatched) {
      return NextResponse.json(
        { error: "invalid token,token dose not match" },
        { status: 401 }
      );
    }

    await UserModel.findByIdAndUpdate(userId, { verified: true });
    await EmailVerificationToken.findByIdAndDelete(verifyToken._id);

    return NextResponse.json({ message: "Your Email Is verified.." });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json(
      {
        error: "could not verify email,something went wrong",
      },
      { status: 500 }
    );
  }
};

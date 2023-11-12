import EmailVerificationToken from "@/app/models/emailVerificationToken";
import UserModel from "@/app/models/userModel";
import db from "@/utils/db";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import crypto from "crypto";
export async function POST(req, res) {
  const body = await req.json();
  await db.connectDb();
  const newUser = await UserModel.create({
    ...body,
  });

  const token = crypto.randomBytes(36).toString("hex");

  await EmailVerificationToken.create({
    user: newUser._id,
    token,
  });

  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "3ac3ad4290b0b4",
      pass: "b5220ae8f3327b",
    },
  });

  await transport.sendMail({
    from: "verification@nextecom.com",
    to: newUser.email,
    html: `<h1>Please Verify Your Email <a href="http://localhost:3000/verify?token=${token}&userId=${newUser._id}">this link </a></h1>`,
  });

  return NextResponse.json({ message: "Please Check your email!" });
}

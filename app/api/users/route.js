import UserModel from "@/app/models/userModel";
import db from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const body = await req.json();
  await db.connectDb();
  const newUser = await UserModel.create({
    ...body,
  });

  return NextResponse.json(newUser);
}

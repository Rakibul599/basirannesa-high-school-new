import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { AdminModel } from "@/lib/models/Admin";
import bcrypt from "bcryptjs";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const hashedPassword = await bcrypt.hash(body.password, 10);

    const admin = new AdminModel({
      name: body.name,
      email: body.email,
      password: hashedPassword,
    });
    const result = await admin.save();
    return NextResponse.json(result, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ err: message }, { status: 200 });
  }
}



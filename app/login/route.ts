import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { AdminModel } from "@/lib/models/Admin";
import bcrypt from "bcryptjs";
import jwt, { type Secret, type SignOptions } from "jsonwebtoken";

export const runtime = "nodejs";

const COOKIE_NAME = process.env.COOKIE_NAME as string;
const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRY = process.env.JWT_EXPIRY as string;

export async function POST(request: NextRequest) {
  try {
    if (!COOKIE_NAME || !JWT_SECRET) {
      console.error("Missing env: COOKIE_NAME or JWT_SECRET");
      return NextResponse.json({ err: "Server not configured" }, { status: 500 });
    }
    await connectToDatabase();
    const body = await request.json();
    const user = await AdminModel.findOne({ email: body.email });
    if (!user) return NextResponse.json({ msg: "Login failed! Please try again." }, { status: 401 });
    const isValid = await bcrypt.compare(body.password, user.password);
    if (!isValid) return NextResponse.json({ msg: "Login failed! Please try again." }, { status: 401 });

    const secret: Secret = JWT_SECRET as Secret;
    const parsedExpiry = Number(JWT_EXPIRY);
    const expiresIn: string | number = Number.isFinite(parsedExpiry)
      ? Math.max(1, Math.floor(parsedExpiry / 1000))
      : (JWT_EXPIRY || "1d");
    const signOptions: SignOptions = { expiresIn } as SignOptions;
    const token = jwt.sign(
      { userid: user._id, username: user.name, email: user.email },
      secret,
      signOptions
    );

    const response = NextResponse.json({ success: true }, { status: 200 });
    const maxAgeSeconds = Number.isFinite(parsedExpiry)
      ? Math.max(1, Math.floor(parsedExpiry / 1000))
      : 60 * 60 * 24;

    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: maxAgeSeconds,
      path: '/',
    });
    return response;
  } catch (err) {
    console.error("/login error:", err);
    return NextResponse.json({ err: "Internal Server Error" }, { status: 500 });
  }
}



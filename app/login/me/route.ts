import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const COOKIE_NAME = process.env.COOKIE_NAME as string | undefined;
const JWT_SECRET = process.env.JWT_SECRET as string | undefined;

export async function GET(request: NextRequest) {
  if (!COOKIE_NAME || !JWT_SECRET) {
    console.error("Missing env: COOKIE_NAME or JWT_SECRET");
    return NextResponse.json({ msg: "Server not configured" }, { status: 500 });
  }
  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (!token) return NextResponse.json({ msg: "Not authenticated" }, { status: 401 });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return NextResponse.json({ msg: "You are authenticated", user: decoded }, { status: 200 });
  } catch {
    return NextResponse.json({ msg: "Invalid token" }, { status: 401 });
  }
}



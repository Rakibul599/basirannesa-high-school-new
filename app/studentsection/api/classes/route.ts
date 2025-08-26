import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { ClassGroupModel } from "@/lib/models/ClassGroup";

export const runtime = "nodejs";

export async function GET() {
  try {
    await connectToDatabase();
    const data = await ClassGroupModel.find();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const doc = new ClassGroupModel(body);
    await doc.save();
    return NextResponse.json(doc, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  }
}



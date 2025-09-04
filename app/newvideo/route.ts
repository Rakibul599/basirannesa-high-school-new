import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { VideoModel } from "@/lib/models/Videos";
// import { link } from "fs";
// import { createWriteStream, mkdirSync, existsSync } from "fs";
// import path from "path";

export const runtime = "nodejs";

export async function GET() {
  try {
    await connectToDatabase();
    const data = await VideoModel.find();
    const mapped = data.map((t) => ({
      _id: t._id,
      title: t.title,
      link: t.link,
      description: t.description,
    }));
    return NextResponse.json(mapped);
  } catch {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const formData = await request.formData();
    const title = String(formData.get("title") ?? "");
    const link = String(formData.get("link") ?? "");
    const description = String(formData.get("description") ?? "");


    const doc = new VideoModel({ title, link, description });
    const saved = await doc.save();
    return NextResponse.json({
      _id: saved._id,
      name: saved.title,
      email: saved.link,
      phone: saved.description,
    }, { status: 200 });
  } catch {
    return NextResponse.json({ err: "Internal Server Error" }, { status: 200 });
  }
}



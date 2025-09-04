import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { VideoModel } from "@/lib/models/Videos";

export async function DELETE(request: Request) {
  try {
    await connectToDatabase();
    const url = new URL(request.url);
    const segments = url.pathname.split("/");
    const id = segments[segments.length - 1];
    const user = await VideoModel.findById(id);
    if (!user) return NextResponse.json({ message: "Video not found" }, { status: 404 });



    await VideoModel.findByIdAndDelete(id);
    return NextResponse.json({ message: "Video deleted" }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}



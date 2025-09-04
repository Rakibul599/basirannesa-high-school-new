import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { PhotoModel } from "@/lib/models/Photos";
import path from "path";
import { unlink } from "fs/promises";

export async function DELETE(request: Request) {
  try {
    await connectToDatabase();
    const url = new URL(request.url);
    const segments = url.pathname.split("/");
    const id = segments[segments.length - 1];
    const user = await PhotoModel.findById(id);
    if (!user) return NextResponse.json({ message: "Photos not found" }, { status: 404 });

    if (user.photos) {
      const filePath = path.join(process.cwd(), "public", "uploads", "photos", user.photos);
      try {
        await unlink(filePath);
      } catch {}
    }

    await PhotoModel.findByIdAndDelete(id);
    return NextResponse.json({ message: "photo deleted" }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}



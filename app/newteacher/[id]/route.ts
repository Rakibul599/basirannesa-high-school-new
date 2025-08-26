import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { TeacherModel } from "@/lib/models/Teachers";
import path from "path";
import { unlink } from "fs/promises";

export async function DELETE(request: Request) {
  try {
    await connectToDatabase();
    const url = new URL(request.url);
    const segments = url.pathname.split("/");
    const id = segments[segments.length - 1];
    const user = await TeacherModel.findById(id);
    if (!user) return NextResponse.json({ message: "Teacher not found" }, { status: 404 });

    if (user.avatars) {
      const filePath = path.join(process.cwd(), "public", "uploads", "avatars", user.avatars);
      try {
        await unlink(filePath);
      } catch {}
    }

    await TeacherModel.findByIdAndDelete(id);
    return NextResponse.json({ message: "Teacher deleted" }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}



import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { ClassGroupModel } from "@/lib/models/ClassGroup";

export async function PUT(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop() as string;
    const updated = await ClassGroupModel.findByIdAndUpdate(id, body, { new: true });
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  try {
    await connectToDatabase();
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop() as string;
    const doc = await ClassGroupModel.findById(id);
    if (!doc) return NextResponse.json({ message: "Not found" }, { status: 404 });

    if (Array.isArray(doc.sections) && doc.sections.length > 1) {
      const body = await request.json();
      const updated = await ClassGroupModel.findByIdAndUpdate(id, body, { new: true });
      return NextResponse.json(updated);
    } else {
      await ClassGroupModel.findByIdAndDelete(id);
      return NextResponse.json({ message: "Deleted successfully" });
    }
  } catch {
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  }
}



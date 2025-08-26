import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { TeacherModel } from "@/lib/models/Teachers";
import { createWriteStream, mkdirSync, existsSync } from "fs";
import path from "path";

export const runtime = "nodejs";

export async function GET() {
  try {
    await connectToDatabase();
    const data = await TeacherModel.find();
    const mapped = data.map((t) => ({
      _id: t._id,
      name: t.name,
      email: t.email,
      phone: t.phone,
      designation: t.designation,
      avatars: t.avatars,
      avatar: t.avatars ? `/uploads/avatars/${t.avatars}` : undefined,
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
    const name = String(formData.get("name") ?? "");
    const email = String(formData.get("email") ?? "");
    const phone = String(formData.get("phone") ?? "");
    const designation = String(formData.get("designation") ?? "");
    const file = formData.get("avatar") as File | null;

    let filename: string | undefined;
    if (file) {
      const ext = path.extname(file.name) || ".jpg";
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      filename = `avatar-${uniqueSuffix}${ext}`;
      const uploadDir = path.join(process.cwd(), "public", "uploads", "avatars");
      if (!existsSync(uploadDir)) mkdirSync(uploadDir, { recursive: true });
      const filePath = path.join(uploadDir, filename);
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      await new Promise<void>((resolve, reject) => {
        const stream = createWriteStream(filePath);
        stream.on("error", reject);
        stream.on("finish", () => resolve());
        stream.end(buffer);
      });
    }

    const doc = new TeacherModel({ name, email, phone, designation, avatars: filename });
    const saved = await doc.save();
    return NextResponse.json({
      _id: saved._id,
      name: saved.name,
      email: saved.email,
      phone: saved.phone,
      designation: saved.designation,
      avatar: saved.avatars ? `/uploads/avatars/${saved.avatars}` : undefined,
    }, { status: 200 });
  } catch {
    return NextResponse.json({ err: "Internal Server Error" }, { status: 200 });
  }
}



import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { PhotoModel } from "@/lib/models/Photos";
import { createWriteStream, mkdirSync, existsSync } from "fs";
import path from "path";

export const runtime = "nodejs";

export async function GET() {
    try {
      await connectToDatabase();
      const data = await PhotoModel.find();
      const mapped = data.map((t) => ({
        _id: t._id,
        title: t.title,
        description: t.description,
        photo: t.photos ? `/uploads/photos/${t.photos}` : undefined, // ✅ always use photos folder
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
      const description = String(formData.get("description") ?? "");
      const file = formData.get("photo") as File | null; // ✅ match frontend "photo"
  
      let filename: string | undefined;
      if (file) {
        const ext = path.extname(file.name) || ".jpg";
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        filename = `photos-${uniqueSuffix}${ext}`;
        const uploadDir = path.join(process.cwd(), "public", "uploads", "photos");
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
  
      const doc = new PhotoModel({ title, description, photos: filename });
      const saved = await doc.save();
      return NextResponse.json({
        _id: saved._id,
        title: saved.title,
        description: saved.description,
        photo: saved.photos ? `/uploads/photos/${saved.photos}` : undefined, // ✅ return consistent path
      }, { status: 200 });
    } catch {
      return NextResponse.json({ err: "Internal Server Error" }, { status: 500 });
    }
  }


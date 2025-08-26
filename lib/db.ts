import mongoose from "mongoose";

declare global {
  var _mongooseCache:
    | { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null }
    | undefined;
}

let cached = globalThis._mongooseCache as
  | { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null }
  | undefined;
if (!cached) {
  cached = { conn: null, promise: null };
  globalThis._mongooseCache = cached;
}

export async function connectToDatabase() {
  const MONGODB_URI = process.env.MONGOOSE_CONNECTION_STRING as string | undefined;
  if (!MONGODB_URI) {
    throw new Error("MONGOOSE_CONNECTION_STRING is not set in environment");
  }
  if (cached!.conn) return cached!.conn;
  if (!cached!.promise) {
    cached!.promise = mongoose.connect(MONGODB_URI);
  }
  cached!.conn = await cached!.promise;
  return cached!.conn;
}



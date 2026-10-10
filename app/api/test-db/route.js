
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "../../../config/db";

export async function GET() {
  try {
    await connectDB();

    // Verify that MongoDB responds to a command
    await mongoose.connection.db.admin().ping();

    return NextResponse.json({
      success: true,
      message: "MongoDB connected successfully",
      database: mongoose.connection.name,
      readyState: mongoose.connection.readyState,
    });
  } catch (error) {
    console.error("Database test failed:", error);

    return NextResponse.json(
      {
        success: false,
        message: "MongoDB connection failed",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

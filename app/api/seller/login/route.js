
import { NextResponse } from "next/server";
import connectDB from "../../../../config/db";
import User from "../../../../models/User";

export async function POST(req) {
  console.log("SELLER LOGIN API HIT");

  try {
    await connectDB();

    const body = await req.json();
    const email = body.email?.trim().toLowerCase();

    console.log("LOGIN EMAIL:", email);

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({
      email: email,
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Email not found" },
        { status: 404 }
      );
    }

    if (!user.isSeller) {
      return NextResponse.json(
        { success: false, message: "User is not a seller" },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Login successful",
      seller: {
        _id: user._id.toString(),
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    console.error("Seller login error:", error);

    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

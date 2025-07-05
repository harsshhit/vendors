import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Vendor from "@/models/Vendor";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    const skip = (page - 1) * limit;

    const vendors = await Vendor.find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return NextResponse.json({
      success: true,
      data: vendors,
    });
  } catch (error) {
    console.error("Error fetching vendors:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch vendors" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();

    if (!body.name || !body.bankAccountNo || !body.bankName) {
      return NextResponse.json(
        {
          success: false,
          error: "Name, bank account number, and bank name are required",
        },
        { status: 400 }
      );
    }

    const vendor = await Vendor.create(body);

    return NextResponse.json({ success: true, data: vendor }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating vendor:", error);

    if (error.name === "ValidationError") {
      return NextResponse.json(
        { success: false, error: "Invalid vendor data" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Failed to create vendor" },
      { status: 500 }
    );
  }
}

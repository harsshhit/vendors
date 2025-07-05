import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Vendor from "@/models/Vendor";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    // Extract id from URL pathname
    const pathname = request.nextUrl.pathname;
    const id = pathname.split("/").pop();

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Vendor ID is required" },
        { status: 400 }
      );
    }

    const vendor = await Vendor.findById(id);

    if (!vendor) {
      return NextResponse.json(
        { success: false, error: "Vendor not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: vendor,
    });
  } catch (error) {
    console.error("Error fetching vendor:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch vendor" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    await dbConnect();

    // Extract id from URL pathname
    const pathname = request.nextUrl.pathname;
    const id = pathname.split("/").pop();

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Vendor ID is required" },
        { status: 400 }
      );
    }

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

    const vendor = await Vendor.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!vendor) {
      return NextResponse.json(
        { success: false, error: "Vendor not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: vendor,
    });
  } catch (error: any) {
    console.error("Error updating vendor:", error);

    if (error.name === "ValidationError") {
      return NextResponse.json(
        { success: false, error: "Invalid vendor data" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Failed to update vendor" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await dbConnect();

    // Extract id from URL pathname
    const pathname = request.nextUrl.pathname;
    const id = pathname.split("/").pop();

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Vendor ID is required" },
        { status: 400 }
      );
    }

    const vendor = await Vendor.findByIdAndDelete(id);

    if (!vendor) {
      return NextResponse.json(
        { success: false, error: "Vendor not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("Error deleting vendor:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete vendor" },
      { status: 500 }
    );
  }
}

import mongoose from "mongoose";

export interface IVendor {
  _id: string;
  name: string;
  bankAccountNo: string;
  bankName: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  country?: string;
  zipCode?: string;
  createdAt: Date;
  updatedAt: Date;
}

const vendorSchema = new mongoose.Schema<IVendor>(
  {
    name: {
      type: String,
      required: [true, "Vendor name is required"],
      trim: true,
    },
    bankAccountNo: {
      type: String,
      required: [true, "Bank account number is required"],
      trim: true,
    },
    bankName: {
      type: String,
      required: [true, "Bank name is required"],
      trim: true,
    },
    addressLine1: {
      type: String,
      trim: true,
    },
    addressLine2: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    country: {
      type: String,
      trim: true,
    },
    zipCode: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent mongoose from creating the model multiple times
export default mongoose.models.Vendor ||
  mongoose.model<IVendor>("Vendor", vendorSchema);

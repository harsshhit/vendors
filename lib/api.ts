import { IVendor } from "@/models/Vendor";

const API_BASE_URL = "/api/vendors";

export interface CreateVendorData {
  name: string;
  bankAccountNo: string;
  bankName: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  country?: string;
  zipCode?: string;
}

export interface UpdateVendorData extends CreateVendorData {}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Fetch all vendors
export async function fetchVendors(): Promise<ApiResponse<IVendor[]>> {
  try {
    const response = await fetch(API_BASE_URL);
    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.error || "Failed to fetch vendors" };
    }

    return data;
  } catch (error) {
    return { success: false, error: "Failed to fetch vendors" };
  }
}

// Fetch single vendor
export async function fetchVendor(id: string): Promise<ApiResponse<IVendor>> {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.error || "Failed to fetch vendor" };
    }

    return data;
  } catch (error) {
    return { success: false, error: "Failed to fetch vendor" };
  }
}

// Create new vendor
export async function createVendor(
  vendorData: CreateVendorData
): Promise<ApiResponse<IVendor>> {
  try {
    const response = await fetch(API_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(vendorData),
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.error || "Failed to create vendor" };
    }

    return data;
  } catch (error) {
    return { success: false, error: "Failed to create vendor" };
  }
}

// Update vendor
export async function updateVendor(
  id: string,
  vendorData: UpdateVendorData
): Promise<ApiResponse<IVendor>> {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(vendorData),
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.error || "Failed to update vendor" };
    }

    return data;
  } catch (error) {
    return { success: false, error: "Failed to update vendor" };
  }
}

// Delete vendor
export async function deleteVendor(id: string): Promise<ApiResponse<void>> {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "DELETE",
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.error || "Failed to delete vendor" };
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to delete vendor" };
  }
}

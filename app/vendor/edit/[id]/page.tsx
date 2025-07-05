"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { fetchVendor, updateVendor } from "@/lib/api";
import { IVendor } from "@/models/Vendor";
import { UpdateVendorData } from "@/lib/api";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";

export default function EditVendorPage() {
  const params = useParams();
  const router = useRouter();
  const vendorId = params.id as string;

  const [vendor, setVendor] = useState<IVendor | null>(null);
  const [formData, setFormData] = useState<UpdateVendorData>({
    name: "",
    bankAccountNo: "",
    bankName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    country: "",
    zipCode: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const loadVendor = async () => {
      try {
        setIsLoading(true);
        const response = await fetchVendor(vendorId);

        if (response.success && response.data) {
          setVendor(response.data);
          setFormData({
            name: response.data.name,
            bankAccountNo: response.data.bankAccountNo,
            bankName: response.data.bankName,
            addressLine1: response.data.addressLine1 || "",
            addressLine2: response.data.addressLine2 || "",
            city: response.data.city || "",
            country: response.data.country || "",
            zipCode: response.data.zipCode || "",
          });
        } else {
          setError("Failed to load vendor");
        }
      } catch (error) {
        setError("Failed to load vendor");
      } finally {
        setIsLoading(false);
      }
    };

    loadVendor();
  }, [vendorId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      const response = await updateVendor(vendorId, formData);

      if (response.success) {
        router.push("/vendor/list");
      } else {
        alert("Failed to update vendor");
      }
    } catch (error) {
      alert("Failed to update vendor");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (error || !vendor) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">
            {error ? "Error Loading Vendor" : "Vendor Not Found"}
          </h1>
          <p className="text-muted-foreground mb-6">
            {error || "The vendor you're looking for doesn't exist."}
          </p>
          <Button asChild>
            <Link href="/vendor/list">Back to Vendor List</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Edit Vendor</h1>
          <p className="text-muted-foreground mt-2">
            Update vendor information
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Vendor Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2"
                >
                  Vendor Name *
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter vendor name"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="bankName"
                  className="block text-sm font-medium mb-2"
                >
                  Bank Name *
                </label>
                <Input
                  id="bankName"
                  name="bankName"
                  value={formData.bankName}
                  onChange={handleInputChange}
                  placeholder="Enter bank name"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="bankAccountNo"
                  className="block text-sm font-medium mb-2"
                >
                  Bank Account Number *
                </label>
                <Input
                  id="bankAccountNo"
                  name="bankAccountNo"
                  value={formData.bankAccountNo}
                  onChange={handleInputChange}
                  placeholder="Enter account number"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="addressLine1"
                  className="block text-sm font-medium mb-2"
                >
                  Address Line 1
                </label>
                <Input
                  id="addressLine1"
                  name="addressLine1"
                  value={formData.addressLine1}
                  onChange={handleInputChange}
                  placeholder="Enter address"
                />
              </div>

              <div>
                <label
                  htmlFor="addressLine2"
                  className="block text-sm font-medium mb-2"
                >
                  Address Line 2
                </label>
                <Input
                  id="addressLine2"
                  name="addressLine2"
                  value={formData.addressLine2}
                  onChange={handleInputChange}
                  placeholder="Enter address (optional)"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium mb-2"
                  >
                    City
                  </label>
                  <Input
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="Enter city"
                  />
                </div>

                <div>
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium mb-2"
                  >
                    Country
                  </label>
                  <Input
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    placeholder="Enter country"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="zipCode"
                  className="block text-sm font-medium mb-2"
                >
                  Zip Code
                </label>
                <Input
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  placeholder="Enter zip code"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Updating..." : "Update Vendor"}
                </Button>
                <Button type="button" variant="outline" asChild>
                  <Link href="/vendor/list">Cancel</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

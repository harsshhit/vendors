"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createVendor } from "@/lib/api";
import { CreateVendorData } from "@/lib/api";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";

export default function CreateVendorPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<CreateVendorData>({
    name: "",
    bankAccountNo: "",
    bankName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    country: "",
    zipCode: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Vendor name is required";
    }

    if (!formData.bankAccountNo.trim()) {
      newErrors.bankAccountNo = "Bank account number is required";
    }

    if (!formData.bankName.trim()) {
      newErrors.bankName = "Bank name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await createVendor(formData);

      if (response.success) {
        router.push("/vendor/list");
      } else {
        alert("Failed to create vendor");
      }
    } catch (error) {
      alert("Failed to create vendor");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Add New Vendor</h1>
          <p className="text-muted-foreground mt-2">
            Enter vendor information below
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
                  className={errors.name ? "border-destructive" : ""}
                />
                {errors.name && (
                  <p className="text-sm text-destructive mt-1">{errors.name}</p>
                )}
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
                  className={errors.bankName ? "border-destructive" : ""}
                />
                {errors.bankName && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.bankName}
                  </p>
                )}
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
                  className={errors.bankAccountNo ? "border-destructive" : ""}
                />
                {errors.bankAccountNo && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.bankAccountNo}
                  </p>
                )}
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
                  {isSubmitting ? "Creating..." : "Create Vendor"}
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

"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { fetchVendors, deleteVendor } from "@/lib/api";
import { IVendor } from "@/models/Vendor";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";

export default function VendorListPage() {
  const [vendors, setVendors] = useState<IVendor[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const vendorsPerPage = 10;

  useEffect(() => {
    const loadVendors = async () => {
      try {
        setIsLoading(true);
        const response = await fetchVendors();

        if (response.success && response.data) {
          setVendors(response.data);
        } else {
          setError("Failed to load vendors");
        }
      } catch (error) {
        setError("Failed to load vendors");
      } finally {
        setIsLoading(false);
      }
    };

    loadVendors();
  }, []);

  const totalPages = Math.ceil(vendors.length / vendorsPerPage);
  const startIndex = (currentPage - 1) * vendorsPerPage;
  const endIndex = startIndex + vendorsPerPage;
  const currentVendors = vendors.slice(startIndex, endIndex);

  const handleDeleteVendor = async (vendorId: string, vendorName: string) => {
    if (confirm(`Delete ${vendorName}?`)) {
      try {
        const response = await deleteVendor(vendorId);

        if (response.success) {
          const updatedVendors = vendors.filter(
            (vendor) => vendor._id !== vendorId
          );
          setVendors(updatedVendors);

          const newTotalPages = Math.ceil(
            updatedVendors.length / vendorsPerPage
          );
          if (currentPage > newTotalPages && newTotalPages > 0) {
            setCurrentPage(newTotalPages);
          }
        } else {
          alert("Failed to delete vendor");
        }
      } catch (error) {
        alert("Failed to delete vendor");
      }
    }
  };

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
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

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <p className="text-destructive mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Vendors</h1>
            <p className="text-muted-foreground mt-2">
              Manage your vendor information
            </p>
          </div>
          <Button asChild>
            <Link href="/vendor/create">
              Add Vendor
            </Link>
          </Button>
        </div>

        {vendors.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <h3 className="text-lg font-semibold mb-2">No vendors yet</h3>
              <p className="text-muted-foreground mb-6">
                Add your first vendor to get started.
              </p>
              <Button asChild>
                <Link href="/vendor/create">Add Vendor</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {currentVendors.map((vendor) => (
              <Card key={vendor._id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex-1 space-y-2">
                      <h3 className="text-lg font-semibold">{vendor.name}</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
                        <div>
                          <span className="font-medium">Bank:</span> {vendor.bankName}
                        </div>
                        <div>
                          <span className="font-medium">Account:</span> {vendor.bankAccountNo}
                        </div>
                        {vendor.city && (
                          <div>
                            <span className="font-medium">City:</span> {vendor.city}
                          </div>
                        )}
                        {vendor.country && (
                          <div>
                            <span className="font-medium">Country:</span> {vendor.country}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/vendor/edit/${vendor._id}`}>
                          Edit
                        </Link>
                      </Button>
                      <Button
                        onClick={() => handleDeleteVendor(vendor._id, vendor.name)}
                        variant="destructive"
                        size="sm"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-6">
                <Button
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  variant="outline"
                  size="sm"
                >
                  Previous
                </Button>
                <span className="text-sm text-muted-foreground">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  variant="outline"
                  size="sm"
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

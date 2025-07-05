import Link from "next/link";
import { Button } from "./components/ui/button";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold">Vendor Tracker</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Simple way to manage your vendors and keep track of important
            details.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button asChild size="lg">
              <Link href="/vendor/list">View Vendors</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/vendor/create">Add Vendor</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}

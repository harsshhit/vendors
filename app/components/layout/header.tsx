import Link from 'next/link';
import { Button } from '@/app/components/ui/button';
import AuthButton from '@/app/components/AuthButton';

export default function Header() {
  return (
    <header className="border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="font-bold text-xl">
          Vendor Tracker
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link 
            href="/vendor/list" 
            className="text-sm hover:text-primary transition-colors"
          >
            Vendors
          </Link>
          <Link 
            href="/vendor/create" 
            className="text-sm hover:text-primary transition-colors"
          >
            Add Vendor
          </Link>
        </nav>
        
        <AuthButton />
      </div>
    </header>
  );
} 
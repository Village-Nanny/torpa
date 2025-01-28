import Link from 'next/link';
import { Button } from '../button';

export default function Header() {
  return (
    <header className="py-4 px-6 bg-white shadow-sm absolute w-full z-10">
      <nav className="flex justify-between items-center max-w-7xl mx-auto">
        <Link href="/" className="text-2xl font-display font-bold text-gray-800">
          PhonemiKids
        </Link>
        <div className="space-x-4">
          <Link href="#features" className="text-sm text-gray-800 hover:text-purple transition-colors">
            Features
          </Link>
          <Link href="#" className="text-sm text-gray-800 hover:text-purple transition-colors">
            About
          </Link>
          <Button variant="outline" size="sm" className="border-purple text-purple hover:bg-purple hover:text-white">
            Get Started
          </Button>
        </div>
      </nav>
    </header>
  );
}

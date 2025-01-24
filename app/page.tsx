import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="text-center space-y-6 p-8">
        <h1 className="text-4xl font-bold">Welcome to Your App</h1>
        <p className="text-xl text-muted-foreground max-w-md mx-auto">
          A production-ready starter template with authentication, state
          management, and more.
        </p>
        <div className="space-x-4">
          <Button asChild>
            <Link href="/login">Sign in</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/register">Create account</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
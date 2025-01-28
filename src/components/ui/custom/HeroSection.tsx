import Image from 'next/image';
import { Button } from '../button';

export default function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col md:flex-row">
      <div className="flex-1 bg-purple-light flex items-center justify-center p-6 md:p-12">
        <div className="max-w-xl">
          <h1 className="animate-in fade-in slide-in-from-bottom duration-700 text-4xl md:text-5xl font-display font-bold mb-6 text-white">
            Discover the Joy of <span className="text-green-light">Phonics</span>
          </h1>
          <p className="animate-in fade-in slide-in-from-bottom delay-500 duration-700 text-xl mb-8 text-white opacity-90">
            Embark on a fun-filled journey of early literacy with our interactive phonemic awareness app.
          </p>
          <div className="space-x-4">
            <Button
              size="lg"
              className="animate-in fade-in slide-in-from-bottom delay-300 duration-700 bg-green hover:bg-green-dark text-white">
              Start Learning
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="animate-in fade-in slide-in-from-bottom delay-400 duration-700 text-white border-white hover:bg-white hover:text-purple">
              Learn More
            </Button>
          </div>
        </div>
      </div>
      <div className="animate-in fade-in duration-1000 flex-1 bg-green-light relative">
        <Image
          src="/placeholder.svg?height=800&width=600"
          alt="Child using PhonemiKids app"
          layout="fill"
          objectFit="cover"
        />
      </div>
    </section>
  );
}

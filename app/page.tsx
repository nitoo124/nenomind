import { TestTubeIcon } from 'lucide-react';
import About from './components/About';
import Hero from './components/Hero';
import Process from './components/process';
import Services from './components/Services';
import WhyChooseUs from './components/WhyChooseUs';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';

export default function Home() {
  return (
    <main className="flex-1 w-full bg-black">
      <Hero />
      <About/>
      <Services/>
      <WhyChooseUs/>
      <Process/>
      <Testimonials/>
      <Contact/>
    </main>
  );
}

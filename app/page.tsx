import dynamic from 'next/dynamic';
import Hero from './components/Hero';

const About = dynamic(() => import('./components/About'), {
  loading: () => <div className="h-24" />,
});
const Process = dynamic(() => import('./components/process'), {
  loading: () => <div className="h-24" />,
});
const Services = dynamic(() => import('./components/Services'), {
  loading: () => <div className="h-24" />,
});
const WhyChooseUs = dynamic(() => import('./components/WhyChooseUs'), {
  loading: () => <div className="h-24" />,
});
const Testimonials = dynamic(() => import('./components/Testimonials'), {
  loading: () => <div className="h-24" />,
});
const Contact = dynamic(() => import('./components/Contact'), {
  loading: () => <div className="h-24" />,
});

export default function Home() {
  return (
    <main className="flex-1 w-full bg-black">
      <Hero />
      <About />
      <Services />
      <WhyChooseUs />
      <Process />
      <Testimonials />
      <Contact />
    </main>
  );
}

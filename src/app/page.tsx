import Footer from '@/components/Footer';
import AboutUs from '@/components/home/AboutUs';
import Banner from '@/components/home/Banner';
import ContactUs from '@/components/home/ContactUs/ContactUs';
import Faq from '@/components/home/Faq';
import Features from '@/components/home/features/Features';
import OurCause from '@/components/home/OurCause';
import OurEvent from '@/components/home/OurEvent';
import OurVolunteers from '@/components/home/OurVolunteers/OurVolunteers';
import Sponsor from '@/components/home/Sponsor';
import UrgentCause from '@/components/home/UrgentCause';
import Welcome from '@/components/home/Welcome';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import Navbar from '@/components/Navbar';

export default function Home() {
  return (
    <main className='p-0 m-0'>
      <Navbar />
      <Banner />
      <UrgentCause />
      <AboutUs />
      <WhyChooseUs />
      <OurCause />
      <OurEvent />
      {/* <ContactUs /> */}
      <OurVolunteers />
      <Features />
      <Faq />
      <Welcome />
      <Sponsor />
      <Footer />
    </main>
  );
}

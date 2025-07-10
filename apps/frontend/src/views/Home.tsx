import Hero from '@components/hero/Hero';
import About from '@components/about/About';
import Services from '@components/services/Services';
import Team from '@components/team/Team';
import Contact from '@components/contact/Contact';

const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Team />
      <Contact />
    </>
  );
};

export default Home;

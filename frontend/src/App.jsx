import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Projects from './sections/Projects';
import Contact from './sections/Contact';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import Banner from './components/Banner';
import SpotifyWidget from './components/SpotifyWidget';

function App() {
  return (
    <>
      <Banner />
      <Navbar />
      <main className="main-wrapper">
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
      <SpotifyWidget />
    </>
  );
}

export default App;

import { ThemeProvider } from '@/context/ThemeContext';
import { LanguageProvider } from '@/context/LanguageContext';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import PremiumWidgets from '@/components/PremiumWidgets';
import { QuickActions, WhyChooseUs } from '@/components/Sections';
import TripPlanner from '@/components/TripPlanner';
import { HotelCategories, FoodGuide, InteractiveMap } from '@/components/Discover';
import { Gallery, Reviews } from '@/components/Content';
import { Emergency, About, Contact, Footer } from '@/components/Footer';
import FloatingButtons from '@/components/FloatingButtons';
import CustomCursor from '@/components/CustomCursor';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="min-h-screen bg-white text-ink dark:bg-slate-950 dark:text-gray-100">
          <Navbar />
          <main>
            <Hero />
            <PremiumWidgets />
            <QuickActions />
            <WhyChooseUs />
            <TripPlanner />
            <HotelCategories />
            <FoodGuide />
            <InteractiveMap />
            <Gallery />
            <Reviews />
            <Emergency />
            <About />
            <Contact />
          </main>
          <Footer />
          <FloatingButtons />
          <CustomCursor />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;


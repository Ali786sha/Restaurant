import Navbar from "./Navbar/Navbar";
import Banner from "./Banner/Banner";
import WelcomeSection from "./welcome/WelcomeSection";
import SpecialDishesSection from "./SpecialDishesSection/SpecialDishesSection";
import MenuSection from "./Menu/Menu";
import TestimonialSection from "./TestimonialSection/TestimonialSection";
import ReservationSection from "./ReservationSection/ReservationSection";
import TeamSection from "./Team/Team";
import Footer from "./Footer/Footer";

export default function Home() {
  return (
    <div>
      <Navbar />
      
      <section id="home">
        <Banner />
      </section>

      <section id="about">
        <WelcomeSection />
        <SpecialDishesSection />
      </section>

      <section id="menu">
        <MenuSection />
      </section>

      <TestimonialSection />

      <ReservationSection />

      <section id="team">
        <TeamSection />
      </section>

      <Footer />
    </div>
  );
}

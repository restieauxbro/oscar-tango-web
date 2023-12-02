import HeroChat from "@/components/website-ui/hero-chat";
import ParalaxSection from "@/components/website-ui/paralax-section";
import ScrollToEnlarge from "@/components/website-ui/scroll-to-enlarge-section";

export default function Home() {
  return (
    <main>
      <div className="overflow-x-hidden">
        <div className="sticky top-0 grid min-h-screen place-items-center md:py-16">
          <HeroChat />
        </div>

        <ScrollToEnlarge />

        <ParalaxSection />
      </div>
    </main>
  );
}

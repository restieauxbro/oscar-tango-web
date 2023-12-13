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
        {/* <div className="bg-cyan-100">
          <div className="mx-auto max-w-screen-lg px-8 py-12 sm:px-6  md:py-16 lg:py-[clamp(4rem,20lvh,8rem)]">
            <div className="max-w-3xl">
              <h2 className="text-5xl font-medium text-cyan-900 sm:text-6xl lg:text-7xl">
                {`Oscar Tango`}
              </h2>
            </div>
          </div>
        </div> */}
        <ParalaxSection />
      </div>
    </main>
  );
}

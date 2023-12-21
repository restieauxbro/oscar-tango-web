import BlinderAnim from "@/components/animations/BlinderAnim";
import HeroChat from "@/components/website-ui/hero-chat";
import ParalaxSection from "@/components/website-ui/paralax-section";
import ScrollToEnlarge from "@/components/website-ui/scroll-to-enlarge-section";
import WhatWeOffer from "@/components/website-ui/what-we-offer";

export default function Home() {
  return (
    <main>
      <div className="">
        <div className="grid min-h-screen place-items-center md:py-16">
          <HeroChat />
        </div>

        <ScrollToEnlarge />
        <WhatWeOffer />
        <div className="grid place-items-center py-[clamp(5rem,10vh,10rem)]">
          <div className="mx-auto max-w-screen-lg px-8 py-12 sm:px-6  md:py-16 lg:py-[clamp(4rem,20lvh,8rem)]">
            <div className="max-w-2xl">
              <BlinderAnim
                text="Oscar Tango is based in Nelson, New Zealand and Melbourne, Australia. We’re a fully remote team of passionate and highly experienced digital professionals. We’re excited to apply our skills and knowledge to helping your organisation develop AI solutions."
                tag="p"
                className="text-base text-neutral-800 md:text-2xl md:leading-snug lg:text-3xl lg:leading-snug"
              />
            </div>
          </div>
        </div>

        <ParalaxSection />
      </div>
    </main>
  );
}

import { ProfileForm } from "@/components/website-ui/contact-form";
import HeroChat from "@/components/website-ui/hero-chat";
import ScrollToEnlarge from "@/components/website-ui/scroll-to-enlarge-section";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Balancer from "react-wrap-balancer";

export default function Home() {
  return (
    <main>
      <div className="overflow-x-hidden">
        <div className="sticky top-0 grid min-h-screen place-items-center py-12">
          <HeroChat />
        </div>

        <ScrollToEnlarge />

        <section className="lg:md-20 relative overflow-hidden bg-slate-800 px-8">
          <Image
            src="/images/vackground-com-agUC-v_D1iI-unsplash.jpg"
            alt="texture"
            width={1920}
            height={1080}
            quality={100}
            className="absolute inset-0 h-full w-full object-cover opacity-60 scale-x-[-1]"
            style={{ objectFit: "cover" }}
          />
          <div className="relative mx-auto max-w-screen-lg py-20 text-white lg:py-28">
            <h2 className="max-w-xl text-3xl font-medium sm:text-4xl lg:text-7xl">
              <Balancer>{`Leading with AI, so you can too`} </Balancer>
            </h2>
            <div className="max-w-lg mr-0 ml-auto mt-12">
              <ProfileForm />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

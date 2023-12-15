import BlinderAnim from "@/components/animations/BlinderAnim";
import HeroChat from "@/components/website-ui/hero-chat";
import ParalaxSection from "@/components/website-ui/paralax-section";
import ScrollToEnlarge from "@/components/website-ui/scroll-to-enlarge-section";

export default function Home() {
  return (
    <main>
      <div className="">
        <div className="grid min-h-screen place-items-center md:py-16">
          <HeroChat />
        </div>

        <ScrollToEnlarge />
        <div className="relative min-h-screen">
          <div className="absolute left-0 top-0 h-full w-[calc(50%-1.5rem)] bg-slate-200"></div>
          <h2 className="sticky top-[calc(100vh-2.1em)] grid grid-cols-2 py-12 pl-4 text-6xl font-semibold text-cyan-900 opacity-40 sm:text-7xl md:text-8xl lg:text-9xl lg:leading-[0.8]">
            What <br /> we offer
          </h2>
          <div className="mx-auto grid max-w-screen-2xl grid-cols-2 gap-12 px-8">
            <div></div>
            <div className="max-w-xl mx-auto">
              {[
                {
                  title: "Custom Custom Knowledge Bases",
                  description:
                    "We can create internal and external knowledge bases that streamline your data, making it easily accessible for customer service, sales, and automated systems.",
                },
                {
                  title: "Enhanced Search",
                  description:
                    "Our semantic search tools understand natural language queries, ensuring more relevant and accurate search results for your products and content.",
                },
                {
                  title: "Customized Digital Assistants",
                  description:
                    "We can design digital assistants tailored to comprehend your customer intentions and execute complex tasks, enhancing user interaction and efficiency.",
                },
                {
                  title: "Bespoke AI Models",
                  description:
                    "We can help you create your own AI model, fine-tuned to perform specific, organisation-centric tasks accurately and efficiently.",
                },
                {
                  title: "Data Summarisation",
                  description:
                    "We help in condensing large volumes of data, such as customer service transcripts or complex documents, into concise, actionable insights.",
                },
                {
                  title: "Categorisation",
                  description:
                    "Our services include creating tailored taxonomies and mapping your content to these structures for more streamlined content management and retrieval.",
                },
              ].map((item, i) => (
                <div key={i} className="mb-24 lg:mb-48">
                  <h3 className="mb-4 text-4xl">{item.title}</h3>
                 <BlinderAnim text={item.description} tag="p" />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="grid place-items-center py-[clamp(5rem,30vh,10rem)]">
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

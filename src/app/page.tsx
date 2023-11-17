import HeroChat from "@/components/website-ui/hero-chat";
import { ChevronDown } from "lucide-react";

export default function Home() {
  return (
    <main>
      <div>
        <div className="sticky top-0 grid min-h-screen place-items-center">
          <HeroChat />
        </div>

        <div className="relative m-4 -mt-8 mb-0 flex justify-center overflow-hidden rounded-3xl bg-cyan-800">
          <div className="absolute left-1/2 top-1 -translate-x-1/2 text-white">
            <ChevronDown />
          </div>

          <section className="text-white">
            <div className="max-w-screen-xl px-8 py-12 sm:px-6 sm:py-12 lg:px-12 lg:py-16">
              <div className="max-w-2xl">
                <h2 className="text-3xl font-medium sm:text-4xl lg:text-7xl">
                  {`Ever have a dream and think wow, that's a lot of unicorns?`}
                </h2>
              </div>
              <div className="ml-auto mr-0 mt-20 max-w-2xl">
                <h2 className="text-3xl font-medium sm:text-4xl lg:text-5xl">
                  {`Well I've got two for you right here, my buddy my guy`}
                </h2>
              </div>

              <div className="mt-12 grid grid-cols-1 gap-8 md:mt-32 md:grid-cols-2 md:gap-12 lg:grid-cols-3">
                <div className="flex items-start gap-4">
                  <span className="shrink-0 rounded-lg bg-gray-800 p-4">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
                      <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                      ></path>
                    </svg>
                  </span>

                  <div>
                    <h2 className="text-lg font-bold">Lorem, ipsum dolor.</h2>

                    <p className="mt-1 text-sm text-gray-300">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Error cumque tempore est ab possimus quisquam reiciendis
                      tempora animi! Quaerat, saepe?
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="shrink-0 rounded-lg bg-gray-800 p-4">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
                      <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                      ></path>
                    </svg>
                  </span>

                  <div>
                    <h2 className="text-lg font-bold">Lorem, ipsum dolor.</h2>

                    <p className="mt-1 text-sm text-gray-300">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Error cumque tempore est ab possimus quisquam reiciendis
                      tempora animi! Quaerat, saepe?
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="shrink-0 rounded-lg bg-gray-800 p-4">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
                      <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                      ></path>
                    </svg>
                  </span>

                  <div>
                    <h2 className="text-lg font-bold">Lorem, ipsum dolor.</h2>

                    <p className="mt-1 text-sm text-gray-300">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Error cumque tempore est ab possimus quisquam reiciendis
                      tempora animi! Quaerat, saepe?
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <section className="lg:md-20 relative bg-white pt-24">
          <div className="h-96 bg-cyan-600"></div>
        </section>
      </div>
    </main>
  );
}

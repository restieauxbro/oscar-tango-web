import Balancer from "react-wrap-balancer";
import { cn } from "@/lib/utils";
import { headingStyles } from "@/components/ui/typography";

export default function Home() {

    return (
      <main>
        <div className="grid min-h-screen place-items-center">
          <div className="grid w-full max-w-screen-lg p-8">
            <div className="mb-24 max-w-xl lg:max-w-3xl">
              <h1 className={cn(headingStyles, "mb-8 md:text-5xl lg:text-6xl")}>
                <Balancer>A heading about bringing AI to industry</Balancer>
              </h1>
              <p className="max-w-lg text-lg lg:text-xl">
                We develop smart digital solutions for businesses looking
                forward. We’re a lean team who has cut the crap and trimmed the
                fat of agency work yada yada yada AI
              </p>
            </div>
          </div>
        </div>
        <div className="m-4 min-h-screen rounded-3xl bg-slate-300"></div>
      </main>
    );
}

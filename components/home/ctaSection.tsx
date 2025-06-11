import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="bg-gray-50 py-12">
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sma:text-4xl md:text-5xl">
              Ready to Save Hours of Reading Time?
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-grray-400">
              Transform lengthy documents into clear, actionable insights with
              our AI-powered summarizer.
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
            <div className="">
              <Button
                size="lg"
                variant="link"
                className="relative overflow-hidden text-white mt-4 text-base sm:text-xl rounded-lg px-7 sm:px-10 lg:px-12 py-4 sm:py-7 lg:py-7 lg:mt-14 font-medium transition-all duration-500 ease-in-out bg-gradient-to-r from-slate-900 via-rose-500 to-rose-800 bg-[length:200%_100%] bg-left hover:bg-right hover:gradient-move hover:no-underline"
              >
                <Link
                  href="/#pricing"
                  className="flex items-center gap-3 no-underline text-white justify-center"
                >
                  <span>Get Started</span>
                  <ArrowRight className=" ml-2 h-4 w-4 animate-pulse" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

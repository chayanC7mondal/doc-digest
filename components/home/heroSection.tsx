import React from "react";
import { Button } from "../ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Badge } from "../ui/badge";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative mx-auto flex flex-col z-0 items-center justify-center py-16 sm:py-20 lg:pb-28 transition-all animate in lg:px-12 max-w-7xl">
      <div className="relative p-[1px] overflow-hidden rounded-full bg-gradient-to-r from-rose-200 via-rose-500 to-rose-800 animate-gradient-x group">
        <Badge
          variant={"secondary"}
          className="relative px-6 py-2 text-base font-medium bg-white rounded-full transition-colors duration-200 group-hover:bg-gradient-to-r group-hover:from-transparent group-hover:to-rose-200"
        >
          <Sparkles className="h-8 w-8 mr-2 text-rose-600 animate-pulse" />
          <p className="text-base text-rose-600">Powered by AI</p>
        </Badge>
      </div>

      <h1 className="font-bold py-6 text-center">
        Transform PDFs into{" "}
        <span className="relative inline-block group">
          {/* Word */}
          <span className="relative z-10 px-2 transition-transform duration-300 ease-in-out group-hover:-rotate-2 group-hover:-skew-y-1">
            concise
          </span>

          {/* Background highlight */}
          <span
            className="absolute inset-0 bg-rose-200/50 -rotate-2 rounded-lg transform -skew-y-1 transition-all duration-500 ease-in-out group-hover:scale-102 group-hover:blur-[1px] group-hover:brightness-110 group-hover:shadow-rose-300/40 group-hover:shadow-md"
            aria-hidden="true"
          ></span>

          {/* Sparkles - only visible on hover */}
          <Sparkles className="absolute -top-3 -left-4 h-4 w-4 text-rose-400 opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition duration-300 ease-out" />
          {/* <Sparkles className="absolute top-1/2 left-full h-5 w-5 text-rose-500 opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition duration-500 ease-out delay-100" /> */}
          <Sparkles className="absolute -bottom-3 -right-3 h-4 w-4 text-rose-300 opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition duration-700 ease-out delay-200" />
        </span>{" "}
        summaries
      </h1>

      <h2 className="text-lg sm:text-xl lg:text-2xl text-center px-4 lg:px-0 lg:max-w-4xl text-gray-600">
        Get a beautiful summary reel of the document in seconds.
      </h2>
      <div>
        <Button
          variant="link"
          className="relative overflow-hidden text-white mt-6 text-base sm:text-xl rounded-full px-8 sm:px-10 lg:px-12 py-6 sm:py-7 lg:py-8 lg:mt-16 font-bold shadow-lg transition-all duration-500 ease-in-out bg-gradient-to-r from-slate-900 via-rose-500 to-rose-800 bg-[length:200%_100%] bg-left hover:bg-right hover:gradient-move hover:no-underline"
        >
          <Link
            href="/#pricing"
            className="flex items-center gap-2 no-underline text-white"
          >
            <span>Try DocDigest</span>
            <ArrowRight className="animate-pulse" />
          </Link>
        </Button>
      </div>
    </section>
  );
}

import { Sparkles } from "lucide-react";
import React from "react";
import { Badge } from "../ui/badge";

export default function UploadHeader() {
  return (
    <section>
      <div className="flex flex-col items-center justify-center gap-6 text-center">
        <div className="relative p-[1px] overflow-hidden rounded-full bg-gradient-to-r from-rose-200 via-rose-500 to-rose-800 animate-gradient-x group">
          <Badge
            variant={"secondary"}
            className="relative px-4 py-2 text-base font-medium bg-white rounded-full transition-colors duration-200 group-hover:bg-gradient-to-r group-hover:from-transparent group-hover:to-rose-200"
          >
            <Sparkles className="h-8 w-8 mr-2 text-rose-600 animate-pulse" />
            <span className="text-base text-rose-600">
              AI Powered Content Creation
            </span>
          </Badge>
        </div>
        <div className="capitalize text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          <h1 className="font-bold py-6 text-center">
            Start Uploading{" "}
            <span className="relative inline-block group">
              {/* Word */}
              <span className="relative z-10 px-2 transition-transform duration-300 ease-in-out group-hover:-rotate-2 group-hover:-skew-y-1">
                Your PDF's
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
            </span>
          </h1>
        </div>
        <div className="mt-2 text-lg leading-8 text-gray-600 max-w-2xl text-center">
          <p className=""> Upload your PDF and let our AI do the magic! ✨</p>
        </div>
      </div>
    </section>
  );
}

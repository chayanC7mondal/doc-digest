import BgGradient from "@/components/common/bg-gradient";
import { Button } from "@/components/ui/button";
import { ArrowRight, Plus } from "lucide-react"; // only the icon stays here
import Link from "next/link";
import NextLink from "next/link"; // use Next.js Link, not the Lucide icon
import React from "react";

export default function DashboardPage() {
  const uploadLimit = 5;
  return (
    <main className="min-h-screen">
      <BgGradient className="from bg-emerald-200 via-teal-200 to-cyan-200" />

      <div className="container mx-auto flex flex-col gap-4">
        <div className="px-2 py-12 sm:py-24">
          <div className="flex gap-4 mb-0 justify-between">
            <div className="flex flex-col gap-2">
              <h1 className="text-4xl font-bold tracking-tight bg-linear-to-r from-gray-600 to-gray-400 bg-clip-text text-transparent">
                Your Summaries
              </h1>
              <p className="text-gray-600">
                Transform your PDFs into concise, actionable insights
              </p>
            </div>

            {/* FAB-style action */}

            <Button
              asChild
              className="
            bg-gradient-to-r from-slate-900 via-rose-500 to-rose-800
            bg-[length:200%_100%] bg-left hover:bg-right
            hover:scale-105 transition-all duration-500 ease-in-out
            !text-white                /* override the variant’s text-primary */ hover:no-underline
          "
            >
              <Link
                href="/upload"
                className="flex items-center gap-2 hover:no-underline text-white"
              >
                <Plus className="w-5 h-5" />
                New Summary
              </Link>
            </Button>
          </div>
          <div className="mb-6 mt-7">
            <div className="bg-rose-50 border border-rose-200 rounded-lg p-4 text-rose-800">
              <p className="text-sm">
                You've reached the limit of {uploadLimit} uploads on the Basic
                plan.{" "}
                <Link
                  href="/#pricing"
                  className="text-rose-800 underline fonr-medium underline-offset-4 inline-flex items-center"
                >
                  Click here to upgrade to Pro{" "}
                  <ArrowRight className="w-4 h-4 inline-block" />
                </Link>{" "}
                for unlimited uploads.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

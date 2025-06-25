import React from "react";
import Link from "next/link";

import BgGradient from "@/components/common/bg-gradient";
import { Button } from "@/components/ui/button";
import { Plus, ArrowRight } from "lucide-react";

import SummaryCard from "@/components/summaries/summary-card";

export default function DashboardPage() {
  const uploadLimit = 5;
  const summaries = [
    {
      id: 1,
      title: "Cohort Hiring",

      created_at: "2025-06-22 10:40:01.325723+00",
      summary_text: "description",
      status: "completed",
    },
  ];

  return (
    <main className="min-h-screen">
      {/* hero background */}
      <BgGradient className="from bg-emerald-200 via-teal-200 to-cyan-200" />

      <div className="container mx-auto flex flex-col gap-4 px-2 py-12 sm:py-24">
        {/* header */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-gray-600 to-gray-400 bg-clip-text text-transparent">
              Your Summaries
            </h1>
            <p className="text-gray-600">
              Transform your PDFs into concise, actionable insights
            </p>
          </div>

          {/* primary action */}
          <Button
            asChild
            variant="link"
            className="
              bg-gradient-to-r from-slate-900 via-rose-500 to-rose-800
              bg-[length:200%_100%] bg-left hover:bg-right
              hover:scale-105 transition-all duration-500 ease-in-out
              !text-white hover:no-underline
            "
          >
            <Link
              href="/upload"
              className="flex items-center gap-2  hover:no-underline"
            >
              <Plus className="w-5 h-5" />
              New&nbsp;Summary
            </Link>
          </Button>
        </div>

        {/* usage-limit banner */}
        <div className="my-7">
          <div className="rounded-lg border border-rose-200 bg-rose-50 p-4 text-rose-800">
            <p className="text-sm">
              You’ve reached the limit of {uploadLimit} uploads on the Basic
              plan.&nbsp;
              <Link
                href="/#pricing"
                className="inline-flex items-center underline underline-offset-4 font-medium hover:underline-offset-8 transition-all duration-300 ease-in-out"
              >
                Click here to upgrade to&nbsp;Pro&nbsp;
                <ArrowRight className="h-4 w-4" />
              </Link>
              &nbsp;for unlimited uploads.
            </p>
          </div>
        </div>

        {/* summary list */}
        <div className="grid  grid-cols-1 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 sm:px-0">
          {summaries.map((summary, index) => (
            <SummaryCard key={index} summary={summary} />
          ))}
        </div>
      </div>
    </main>
  );
}

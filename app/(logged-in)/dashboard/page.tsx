import React from "react";
import Link from "next/link";

import BgGradient from "@/components/common/bg-gradient";
import { Button } from "@/components/ui/button";
import { Plus, ArrowRight } from "lucide-react";

import SummaryCard from "@/components/summaries/summary-card";
import { getSummaries } from "@/lib/summaries";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import EmptySummaryState from "@/components/summaries/empty-summary-state";
import { hasReachedUploadLimit, syncUserToDatabase } from "@/lib/user";
import SyncButton from "@/components/dashboard/sync-button";

export default async function DashboardPage() {
  const user = await currentUser();
  const userId = user?.id;
  if (!userId) {
    return redirect("/sign-in");
  }

  // Sync user to database
  if (user?.emailAddresses?.[0]?.emailAddress) {
    await syncUserToDatabase({
      email: user.emailAddresses[0].emailAddress,
      fullName: user.fullName || null,
      userId: userId,
    });
  }

  const uploadLimitData = await hasReachedUploadLimit(userId);
  const summaries = await getSummaries(userId);

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
          <div className="flex gap-2">
            {!uploadLimitData.hasReachedUploadLimit && (
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
            )}
            <SyncButton />
          </div>
        </div>

        {/* usage-limit banner */}
        {uploadLimitData.hasReachedUploadLimit && (
          <div className="my-7">
            <div className="rounded-lg border border-rose-200 bg-rose-50 p-4 text-rose-800">
              <p className="text-sm">
                You've reached the limit of {uploadLimitData.uploadLimit} uploads on the Basic
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
        )}
        {summaries.length == 0 ? (
          <EmptySummaryState />
        ) : (
          <div className="grid  grid-cols-1 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 sm:px-0">
            {summaries.map((summary, index) => (
              <SummaryCard key={index} summary={summary} />
            ))}
          </div>
        )}
        
        {/* TODO: Add loading skeleton for summaries grid */}
        {/* <div className="grid grid-cols-1 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 sm:px-0">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-48 bg-gray-200 rounded-lg animate-pulse" />
            ))}
          </div> */}
      </div>
    </main>
  );
}

import React from "react";
import { Card } from "../ui/card";
import DeleteButton from "./delete-button";
import Link from "next/link";
import { FileText } from "lucide-react";

import { cn, formatFileName } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
const SummaryHeader = ({
  fileUrl,
  title,
  createdAt,
}: {
  fileUrl: string;
  title: string | null;
  createdAt: string;
}) => {
  return (
    <div className="flex items-start gap-2 sm:gap-4 ">
      <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-rose-400 mt-1" />
      <div className="flex-1 min-w-0">
        <h3 className="text-base xl:text-lg font-semibold text-gray-900 truncate w-4/5 ">
          {title || formatFileName(fileUrl)}
        </h3>
        <p className="text-sm text-gray-500">
          {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
          {/* date fns package */}
        </p>
      </div>
    </div>
  );
};

const StatusBadge = ({ status }: { status: string }) => {
  return (
    <span
      className={cn(
        "px-3 py-1 text-xs font-medium rounded-full capitalize",
        status == "completed"
          ? "bg-green-100 text-green-800"
          : "bg-yellow-100 text-yellow-800"
      )}
    >
      {status}
    </span>
  );
};

export default function SummaryCard({ summary }: { summary: any }) {
  return (
    <div>
      <Card className="relative h-full">
        <div className="absolute top-2 right-2">
          <DeleteButton summaryId={summary.id} />
        </div>
        <Link href={`summaries/${summary.id}`} className="block p-4 sm:p-6">
          <div className="flex flex-col gap-3 sm:gap-4">
            <SummaryHeader
              fileUrl={summary.original_file_url}
              title={summary.title}
              createdAt={summary.created_at}
            />
            <p className="text-gray-600 line-clamp-2 text-sm sm:text-base pl-3">
              {summary.summary_text}
            </p>

            <div className="flex justify-between items-center mt-2 sm:mt-4">
              <StatusBadge status={summary.status} />
            </div>
          </div>
        </Link>
      </Card>
    </div>
  );
}

/* TODO: Add loading skeleton component for SummaryCard
export function SummaryCardSkeleton() {
  return (
    <Card className="relative h-full">
      <div className="block p-4 sm:p-6">
        <div className="flex flex-col gap-3 sm:gap-4">
          <div className="flex items-start gap-2 sm:gap-4">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-200 rounded animate-pulse mt-1" />
            <div className="flex-1 min-w-0">
              <div className="h-5 bg-gray-200 rounded animate-pulse w-4/5 mb-2" />
              <div className="h-4 bg-gray-200 rounded animate-pulse w-1/3" />
            </div>
          </div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-full mb-2 pl-3" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4 pl-3" />
          <div className="flex justify-between items-center mt-2 sm:mt-4">
            <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </Card>
  );
}
*/

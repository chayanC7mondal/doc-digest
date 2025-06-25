import { FileText } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

export default function EmptySummaryState() {
  return (
    <div className="text-center py-12">
      <FileText className="w-16 h-16 text-gray-400" />
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-xl font-semibold text-gray-400">
          No Summaries Yet{" "}
        </h2>
        <p className="text-gray-500 max-w-md">
          Upload your first PDF to get started with DocDigest.
        </p>
        <Link href="/upload">
          <Button
            variant={"link"}
            className="mt-4 bg-gradient-to-r from-slate-900 via-rose-500 to-rose-800
              bg-[length:200%_100%] bg-left hover:bg-right
              hover:scale-105 transition-all duration-500 ease-in-out
              !text-white hover:no-underline"
          >
            Create Your First Summary
          </Button>
        </Link>
      </div>
    </div>
  );
}

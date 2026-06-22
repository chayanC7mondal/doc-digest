"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CheckCircle, Loader2 } from "lucide-react";
import Link from "next/link";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const syncUser = async () => {
      const sessionId = searchParams.get("session_id");

      if (!sessionId) {
        setStatus("error");
        setMessage("No session ID found. Redirecting to dashboard...");
        setTimeout(() => router.push("/dashboard"), 3000);
        return;
      }

      console.log("Processing payment success with session ID:", sessionId);

      try {
        const response = await fetch("/api/sync-user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ sessionId }),
        });

        const data = await response.json();

        console.log("Sync user response:", data);

        if (response.ok && data.success) {
          setStatus("success");
          setMessage("Payment successful! Your account has been upgraded.");
          // Force a hard refresh to ensure PlanBadge updates
          setTimeout(() => {
            window.location.href = "/dashboard";
          }, 3000);
        } else {
          setStatus("error");
          setMessage(data.error || "Failed to sync account. Please contact support.");
        }
      } catch (error) {
        console.error("Error syncing user:", error);
        setStatus("error");
        setMessage("An error occurred. Please try again or contact support.");
      }
    };

    syncUser();
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <div className="max-w-md w-full mx-4 p-8 bg-white rounded-2xl shadow-xl">
        {status === "loading" && (
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-16 h-16 text-rose-500 animate-spin" />
            <h2 className="text-2xl font-bold text-gray-900">
              Processing your payment...
            </h2>
            <p className="text-gray-600 text-center">
              Please wait while we set up your account.
            </p>
          </div>
        )}

        {status === "success" && (
          <div className="flex flex-col items-center gap-4">
            <CheckCircle className="w-16 h-16 text-green-500" />
            <h2 className="text-2xl font-bold text-gray-900">
              Payment Successful!
            </h2>
            <p className="text-gray-600 text-center">{message}</p>
            <Button asChild className="w-full">
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
          </div>
        )}

        {status === "error" && (
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
              <span className="text-3xl">⚠️</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              Something went wrong
            </h2>
            <p className="text-gray-600 text-center">{message}</p>
            <div className="flex gap-2 w-full">
              <Button asChild variant="outline" className="flex-1">
                <Link href="/dashboard">Go to Dashboard</Link>
              </Button>
              <Button asChild className="flex-1">
                <Link href="/#pricing">Try Again</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

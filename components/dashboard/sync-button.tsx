"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { toast } from "sonner";

export default function SyncButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSync = async () => {
    setIsLoading(true);
    try {
      // For manual sync, we just sync the current user from Clerk
      const response = await fetch("/api/sync-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}), // Empty body for manual sync
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Account synced successfully!");
        window.location.reload(); // Force refresh to update UI
      } else {
        toast.error(data.error || "Failed to sync account");
      }
    } catch (error) {
      toast.error("An error occurred while syncing");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleSync}
      variant="outline"
      size="icon"
      title="Sync account status"
      disabled={isLoading}
      className="hover:bg-rose-50 hover:text-rose-600"
    >
      <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
    </Button>
  );
}

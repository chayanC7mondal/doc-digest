"use client";

import { Trash2 } from "lucide-react";
import React, { useTransition } from "react";
import { Button } from "../ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { useState } from "react";
import { deleteSummaryAction } from "@/actions/summary-actions";
import { toast } from "sonner";
interface DeleteButtonProps {
  summaryId: string;
}

export default function DeleteButton({ summaryId }: DeleteButtonProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const handleDelete = async () => {
    startTransition(async () => {
      // Implement the delete logic here
      //await deleteSummary(summaryId);
      //start transition react hook
      const result = await deleteSummaryAction({ summaryId });
      if (!result.success) {
        toast.error("Failed to delete summary");
      } else {
        toast.success("Summary deleted");
      }
      setOpen(false);
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-700 bg-gray-50 border border-gray-200 hover:text-rose-600 hover:bg-rose-50 "
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Summary</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this summary? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="ghost"
            className=" px-2 bg-gray-50 border border-gray-200 hover:text-gray-700 hover:bg-gray-200 hover:border-gray-700 "
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            className="px-2 text-gray-700 bg-gray-50 border border-gray-200 hover:text-rose-600 hover:bg-rose-50 hover:border-rose-700 "
            onClick={handleDelete}
          >
            {isPending ? "Deleting" : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

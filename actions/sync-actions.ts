"use server";

import { syncUserToDatabase } from "@/lib/user";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function manualSyncUserAction(formData: FormData) {
  try {
    const user = await currentUser();
    const userId = user?.id;

    if (!userId) {
      return { success: false, error: "User not found" };
    }

    if (user?.emailAddresses?.[0]?.emailAddress) {
      await syncUserToDatabase({
        email: user.emailAddresses[0].emailAddress,
        fullName: user.fullName || null,
        userId: userId,
      });
    }

    // Revalidate paths to update UI
    revalidatePath("/dashboard");
    revalidatePath("/");

    return { success: true, message: "User synced successfully" };
  } catch (error) {
    console.error("Error in manual sync:", error);
    return { success: false, error: "Failed to sync user" };
  }
}

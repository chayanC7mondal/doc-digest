import BgGradient from "@/components/common/bg-gradient";
import UploadForm from "@/components/upload/uploadForm";
import UploadHeader from "@/components/upload/uploadHeader";
import { hasReachedUploadLimit } from "@/lib/user";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function page() {
  const user = await currentUser();
  const userId = user?.id;
  
  if (!userId) {
    redirect("/sign-in");
  }
  
  const { hasReachedUploadLimit: hasReachedLimit, uploadLimit } = await hasReachedUploadLimit(userId);
  return (
    <section className="min-h-screen">
      <BgGradient />
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="flex flex-col items-center justify-center gap-6 text-center">
          <UploadHeader />
          {hasReachedLimit && (
            <div className="rounded-lg border border-rose-200 bg-rose-50 p-4 text-rose-800">
              <p className="text-sm">
                You've reached the limit of {uploadLimit} uploads on your current plan.
              </p>
            </div>
          )}
          <UploadForm />
        </div>
      </div>
    </section>
  );
}

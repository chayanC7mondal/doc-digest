import BgGradient from "@/components/common/bg-gradient";
import UploadForm from "@/components/upload/uploadForm";
import UploadHeader from "@/components/upload/uploadHeader";
import { hasReachedUploadLimit } from "@/lib/user";

export default async function page() {
  const user = await getCurrentUser();
  const { hasReachedLimit } = await hasReachedUploadLimit(userId);
  return (
    <section className="min-h-screen">
      <BgGradient />
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="flex flex-col items-center justify-center gap-6 text-center">
          <UploadHeader />
          <UploadForm />
        </div>
      </div>
    </section>
  );
}

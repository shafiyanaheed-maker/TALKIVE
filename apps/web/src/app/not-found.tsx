import Link from "next/link";
import { Video, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground px-6 text-center">
      <div className="w-12 h-12 rounded-2xl bg-accent text-accent-foreground flex items-center justify-center mb-6">
        <Video className="w-6 h-6 stroke-[2.5]" />
      </div>
      <h1 className="text-4xl font-black tracking-tight">404</h1>
      <h2 className="text-xl font-bold mt-2 text-card-foreground">
        Workspace Not Found
      </h2>
      <p className="text-sm text-muted-foreground mt-2 max-w-md">
        The meeting room, environment, or link you are trying to reach does not exist or has ended.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-sm transition-all"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Platform</span>
      </Link>
    </div>
  );
}

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

type PageShellProps = {
  children: React.ReactNode;
};

export function PageShell({ children }: PageShellProps) {
  return (
    <div className="min-h-screen overflow-hidden">
      <div className="pointer-events-none fixed inset-0 -z-10 opacity-70">
        <div className="absolute left-[-10%] top-16 h-72 w-72 rounded-full bg-flux-purple/30 blur-3xl" />
        <div className="absolute right-[-8%] top-40 h-96 w-96 rounded-full bg-flux-pink/20 blur-3xl" />
      </div>
      <SiteHeader />
      {children}
      <SiteFooter />
    </div>
  );
}

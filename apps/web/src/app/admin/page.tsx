import { AdminDashboard } from "@/features/admin/components/admin-dashboard";
import { AdminGate } from "@/features/admin/components/admin-gate";
import { PageShell } from "@/components/layout/page-shell";

export default function AdminPage() {
  return (
    <PageShell>
      <AdminGate>
        <AdminDashboard />
      </AdminGate>
    </PageShell>
  );
}

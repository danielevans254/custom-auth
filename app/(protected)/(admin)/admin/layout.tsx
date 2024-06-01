import { Card, CardContent, CardHeader } from "@/components/ui/card";
import RoleGate from "@/components/auth/role-gate";
import { DocsSidebarNav } from "@/components/ui/sidebar-nav";
import { docsConfig } from "@/config/sidebar-items";

type AdminLayoutProps = {
  children: React.ReactNode;
}

// TODO: Based on what is clicked the given table will be rendered for that specific page
export const AdminLayout = ({ children }: AdminLayoutProps) => {

  return (
    <RoleGate allowedRoles={['ADMIN']}>
      <Card className="my-8">
        <CardHeader>
          Admin Page
          {/* TODO: Make this a sidebar honestly */}
          <div className="flex-1 md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10">
            <aside className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r py-6 pr-2 md:sticky md:block lg:py-10">
              <DocsSidebarNav items={docsConfig.sidebarNav} />
            </aside>
            {children}
          </div>
        </CardHeader>
      </Card >
    </RoleGate>
  );
}

export default AdminLayout;
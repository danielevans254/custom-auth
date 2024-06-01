'use client'

import { useCurrentRole } from "@/hooks/use-current-role";
import { UserRole } from "@prisma/client";
import { useRouter } from "next/navigation";
import { FormError } from "../form-error";

interface RoleGateProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
}
// TODO: Make it so that the role gate needs to check first the user role before rendering the children
export const RoleGate = ({ children }: RoleGateProps) => {
  const router = useRouter();
  const role = useCurrentRole();
  // FIXME: Make sure to replace this with ADMIN
  if (role !== 'ADMIN') {
    return (
      <div className="pt-2">
        <FormError message="You aren't authorized to view this page" />
      </div>
    );
  }
  return (
    <>
      {children}
    </>
  );
}

export default RoleGate;
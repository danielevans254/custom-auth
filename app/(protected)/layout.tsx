import TopNavbar from "@/components/auth/top-navbar";

type ProtectLayoutProps = {
  children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectLayoutProps) => {
  return (
    <div className="size-full flex flex-col gap-y-10 items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1c92d2] to-[#f2fcfe]">
      <TopNavbar />
      {children}
    </div>
  )
}

export default ProtectedLayout;

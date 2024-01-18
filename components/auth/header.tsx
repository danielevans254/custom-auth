import { cn } from "@/lib/utils";

interface HeaderProps {
  label: string;
}

export const Header = ({
  label
}: HeaderProps) => {
  return (
    <div className="flex flex-col text-center space-y-4">
      <h1 className="text-2xl font-bold">🔐Auth</h1>
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  )
}
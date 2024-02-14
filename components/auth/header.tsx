import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface HeaderProps {
  label: string;
}

export const Header = ({
  label
}: HeaderProps) => {


  return (
    <div className="space-y-2 text-center flex flex-col">
      <div className="relative left-0 flex">
        <div className="space-y-2 text-center flex flex-col">
          <div className="relative left-0 flex">
            <Link href="/">
              <Image src="/logo.svg" alt="Logo" width={40} height={40} />
            </Link>
          </div>
        </div>
      </div>
      <h1 className="text-3xl font-bold">
        {process.env.NEXT_PUBLIC_APP_NAME}
      </h1>
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  )
}
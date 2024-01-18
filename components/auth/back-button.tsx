'use client'

import Link from "next/link";
import { Button } from "../ui/button";

interface BackButtonProps {
  label: string;
  href: string;
}
const BackButton = ({
  label,
  href
}: BackButtonProps) => {

  return (
    <Button asChild className="w-full hover:text-blue-600" variant={"ghost"}>
      <Link href={href}>
        <span className="text-xs">{label}</span>
      </Link>
    </Button>
  );
}

export default BackButton; 
'use client'

import { useRouter } from 'next/navigation';

interface RegisterButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

const RegisterButton = ({
  children,
  mode = "redirect",
  asChild,
}: RegisterButtonProps) => {

  const router = useRouter();

  const handleNavigate = () => {
    router.push("/register")
  }

  const handleModal = () => {
    return (
      <span> TODO </span>
    )
  }

  return (
    <span onClick={handleNavigate} className="cursor-pointer">
      {children}
    </span>
  );
}

export default RegisterButton;
'use client'
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { SiFacebook } from "react-icons/si";
import { SiTwitter } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { cn } from "@/lib/utils";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { CircularProgress } from "@mui/material";

interface SocialButtonProps {
  providerIsLoading: boolean;
}

const SocialButton = ({ providerIsLoading }: SocialButtonProps) => {
  const buttonClassName = cn("flex items-center justify-center w-full gap-x-2 mx-auto text-center border-2 border-gray-400 hover:bg-slate-300");
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const [isGithubLoading, setIsGithubLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleClick = async (provider: "google" | "github") => {
    if (provider === "google") {
      setIsGoogleLoading(true);
      setIsGithubLoading(false);
    }
    if (provider === "github") {
      setIsGithubLoading(true);
      setIsGoogleLoading(false);
    }
    await signIn(provider, {
      callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  }

  return (
    <div className="grid grid-cols-2 items-center w-full gap-2">
      <Button variant="secondary" size="sm" className={buttonClassName} onClick={() => handleClick("google")} disabled={isGithubLoading || providerIsLoading}>
        {isGoogleLoading ? (
          <CircularProgress size={20} color="inherit" />
        ) : (
          <>
            <FcGoogle className="text-xl" />
            <span>Google</span>
          </>
        )}
      </Button>
      <Button variant="secondary" size="sm" className={buttonClassName} onClick={() => handleClick("github")} disabled={isGoogleLoading || providerIsLoading}>
        {isGithubLoading ? (
          <CircularProgress size={20} color="inherit" />
        ) : (
          <>
            <FaGithub className="text-xl" />
            <span>Github</span>
          </>
        )}
      </Button>
      {/* NOTE: Im not really familiar with the facebook and twitter provider for */}
      {/* <Button variant="secondary" size="sm" className={buttonClassName}>
        <SiFacebook className="text-xl" />
        <span>Facebook</span>
      </Button>
      <Button variant="secondary" size="sm" className={buttonClassName}>
        <SiTwitter className="text-xl bg-bl" />
        <span>Twitter</span>
      </Button> */}
    </div>
  );
}

export default SocialButton;
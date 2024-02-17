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
import Loader from "@/components/auth/loader";

// TODO: Make the loader a reusable component
const SocialButton = () => {
  const buttonClassName = cn("flex items-center justify-center w-full gap-x-2 mx-auto text-center border-2 border-gray-400 hover:bg-slate-300");
  // TODO: Change the loading to a spinner
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const [isGithubLoading, setIsGithubLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const handleClick = async (provider: "google" | "github") => {
    if (provider === "google") {
      setIsGoogleLoading(true);
      setIsGithubLoading(false);
      setIsDisabled(true);
    }
    if (provider === "github") {
      setIsGithubLoading(true);
      setIsGoogleLoading(false);
      setIsDisabled(true);
    }
    await signIn(provider, {
      callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  }

  return (
    <div className="grid grid-cols-2 items-center w-full gap-2">
      <Button variant="secondary" size="sm" className={buttonClassName} onClick={() => handleClick("google")} disabled={isDisabled}>
        {isGoogleLoading ? (
          <Loader />
        ) : (
          <>
            <FcGoogle className="text-xl" />
            <span>Google</span>
          </>
        )}
      </Button>
      <Button variant="secondary" size="sm" className={buttonClassName} onClick={() => handleClick("github")} disabled={isDisabled}>
        {isGithubLoading ? (
          <Loader />
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
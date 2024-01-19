'use client'
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";
import RegisterButton from "@/components/auth/register-button";
import { FaSignInAlt } from "react-icons/fa";

const poppins = Poppins({ subsets: ["latin"], weight: ["600"] });

export default function Home() {

  const handleSignIn = () => {
    console.log("Sign In");
  }

  const handleRegister = () => {
    console.log("Register");
  }



  return (
    // Nice Gradient: https://uigradients.com/#RoseWater
    <main className="flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1c92d2] to-[#f2fcfe]">
      <div className="p-12 space-y-6 text-center h-3/5 ">
        <div className="flex flex-col items-center justify-center">
          <div className="text-5xl mb-4">
            <span>🔐</span>
          </div>
          <h1 className={cn("text-5xl font-bold text-white drop-shadow-xl", poppins.className)}>
            Auth Page
          </h1>
          <div className="text-center flex  flex-col items-center justify-center mt-8 space-y-4">
            <LoginButton>
              <Button onClick={handleSignIn} variant="secondary" size="lg" className="w-36">
                <span className="left-0 mr-2">
                  <FaSignInAlt className="w-4 h-4" />
                </span>
                Sign In
              </Button>
            </LoginButton>
            <RegisterButton>
              <Button onClick={handleRegister} variant="secondary" size="lg" className="w-36">
                <span className="left-0 mr-2">
                  <FaSignInAlt className="w-4 h-4" />
                </span>
                Register
              </Button>
            </RegisterButton>
          </div>
        </div>
      </div>
    </main>
  )
}

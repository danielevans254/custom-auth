'use client'
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";
const poppins = Poppins({ subsets: ["latin"], weight: ["600"] });

export default function Home() {

  const handleSignIn = () => {
    console.log("Sign In");
  }



  return (
    // Nice Gradient: https://uigradients.com/#RoseWater
    <main className="flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1c92d2] to-[#f2fcfe]">
      <div className="p-12 space-y-6 text-center border-white border-2 h-[32rem] w-[36rem]">
        <div className="flex flex-col items-center justify-center">
          <div className="text-5xl mb-4">
            <span>🔐</span>
          </div>
          <h1 className={cn("text-5xl font-bold text-white drop-shadow-xl", poppins.className)}>
            Login Page
          </h1>
          <div className="mt-4">
            <LoginButton>
              <Button onClick={handleSignIn} variant="secondary" size="lg" >Sign In</Button>
            </LoginButton>
          </div>
        </div>
      </div>
    </main>
  )
}

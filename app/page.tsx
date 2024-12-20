'use client'
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";
import RegisterButton from "@/components/auth/register-button";
import { FaSignInAlt } from "react-icons/fa";

const poppins = Poppins({ subsets: ["latin"], weight: ["600"] });

// THIS WILL BE THE HOME PAGE, YOU CAN call the sign in and register button here, to redirect to the login or register page
// TODO: If there is a session make sure to redirect to the default login redirect
export default function Home() {

  return (
    // Nice Gradient: https://uigradients.com/#RoseWater
    <main className="flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1c92d2] to-[#f2fcfe]">
      <div className="p-12 space-y-6 text-center h-3/5 ">
        <div className="flex flex-col items-center justify-center">
          <div className="text-5xl mb-4">
          </div>
          <h1 className={cn("text-5xl font-bold text-white drop-shadow-xl", poppins.className)}>
            Welcome to {process.env.NEXT_PUBLIC_APP_NAME}
          </h1>
          <span className="text-white text-xl pt-4">To get started, please sign in or register</span>
          <div className="text-center flex  flex-col items-center justify-center mt-8 space-y-4">
            <LoginButton asChild>
              <Button variant="secondary" size="lg" className="w-36">
                <span className="left-0 mr-2">
                  <FaSignInAlt className="w-4 h-4" />
                </span>
                Sign In
              </Button>
            </LoginButton>
            <RegisterButton asChild>
              <Button variant="secondary" size="lg" className="w-36">
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

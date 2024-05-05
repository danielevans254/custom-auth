'use client'

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Header } from "./header";
import SocialButton from "./social-button";
import BackButton from "./back-button";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
}

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial,
}: CardWrapperProps) => {
  return (
    <Card className="w-[450px] shadow-2xl bg-gradient-to-br from-blue-300/50 via-sky-100 to-indigo-100/80">
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
      {showSocial && (
        <div className="space-y-4">
          <span className="text-sm font-medium text-gray-900">
            or continue with the following
          </span>
          <CardFooter>
            <SocialButton />
          </CardFooter>
        </div>
      )
      }
      <CardFooter>
        <BackButton label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
    </Card >
  )
}
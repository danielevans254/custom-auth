'use client'
import ErrorMessageCard from "@/components/auth/error-card";
import { useSearchParams } from "next/navigation";
const ErrorPage = () => {
  // TODO: REMOVE IT FROM THIS, this  will be assigned to the card wrapper form error messages instead
  const searchParams = useSearchParams();
  const errorUrl = searchParams.get("error") === "OAuthCallbackError" ? "Verify your email" : "";
  return (
    <ErrorMessageCard errorMessage={errorUrl ? errorUrl : "An unexpected error has occurred"} />
  );
}

export default ErrorPage;